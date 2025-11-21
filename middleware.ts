import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limiting store
// Note: For production with multiple instances, consider using Upstash Redis
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

// Rate limit configuration by route pattern
const RATE_LIMITS: Record<string, { requests: number; windowMs: number }> = {
  '/api/tmdb': { requests: 40, windowMs: 10000 }, // 40 req/10s (matches TMDB)
  '/api/news': { requests: 30, windowMs: 60000 }, // 30 req/min (NewsAPI limits)
  '/api/image-proxy': { requests: 100, windowMs: 60000 }, // 100 req/min
  '/api/social': { requests: 60, windowMs: 60000 }, // 60 req/min
  '/api': { requests: 60, windowMs: 60000 }, // Default: 60 req/min
};

function getRateLimitConfig(pathname: string): { requests: number; windowMs: number } {
  // Find the most specific matching rate limit
  const patterns = Object.keys(RATE_LIMITS).sort((a, b) => b.length - a.length);

  for (const pattern of patterns) {
    if (pathname.startsWith(pattern)) {
      return RATE_LIMITS[pattern];
    }
  }

  return RATE_LIMITS['/api'];
}

function getClientIdentifier(request: NextRequest): string {
  // Use IP address as identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
  return ip;
}

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const clientId = getClientIdentifier(request);
  const pathname = request.nextUrl.pathname;
  const config = getRateLimitConfig(pathname);

  const now = Date.now();
  const key = `${clientId}:${pathname.split('/').slice(0, 3).join('/')}`; // Group by route prefix

  const record = rateLimitStore.get(key);

  // Reset if window has passed
  if (!record || now - record.lastReset > config.windowMs) {
    rateLimitStore.set(key, { count: 1, lastReset: now });

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(config.requests));
    response.headers.set('X-RateLimit-Remaining', String(config.requests - 1));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil((now + config.windowMs) / 1000)));
    return response;
  }

  // Check if limit exceeded
  if (record.count >= config.requests) {
    const retryAfter = Math.ceil((config.windowMs - (now - record.lastReset)) / 1000);

    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(config.requests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil((record.lastReset + config.windowMs) / 1000)),
        },
      }
    );
  }

  // Increment counter
  record.count++;

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(config.requests));
  response.headers.set('X-RateLimit-Remaining', String(config.requests - record.count));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil((record.lastReset + config.windowMs) / 1000)));

  return response;
}

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.lastReset > maxAge) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export const config = {
  matcher: '/api/:path*',
};
