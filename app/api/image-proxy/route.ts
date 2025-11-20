import { NextRequest, NextResponse } from 'next/server';

// Allowed domains for image proxy to prevent abuse
const ALLOWED_DOMAINS = [
  // TMDB images
  'image.tmdb.org',
  // News image sources
  'images.unsplash.com',
  'cdn.pixabay.com',
  // Common CDNs
  'res.cloudinary.com',
  'images.pexels.com',
  // Major news sources
  'ichef.bbci.co.uk',
  'static01.nyt.com',
  'cdn.cnn.com',
  'media.cnn.com',
  's.yimg.com',
  'a.espncdn.com',
  'platform.polygon.com',
  // Additional news sources
  'cdn.arstechnica.net',
  'www.politico.com',
  'static.politico.com',
  'assets1.cbsnewsstatic.com',
  'assets2.cbsnewsstatic.com',
  'assets3.cbsnewsstatic.com',
  'static.clubs.nfl.com',
  'image.cnbcfm.com',
  'images.axios.com',
  'media.pitchfork.com',
  'media-cldnry.s-nbcnews.com',
  'i.abcnewsfe.com',
  // More news CDNs
  'media.zenfs.com',
  'img.huffingtonpost.com',
  'www.washingtonpost.com',
  'wp.com',
  'i.insider.com',
  'i0.wp.com',
  'i1.wp.com',
  'i2.wp.com',
  'cdn.vox-cdn.com',
  'techcrunch.com',
  'tctechcrunch2011.files.wordpress.com',
  // Social media
  'pbs.twimg.com',
  'abs.twimg.com',
];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // URL is already decoded by Next.js searchParams
    const imageUrl = url;

    let urlObj: URL;
    let urlOrigin: string;
    try {
      urlObj = new URL(imageUrl);
      urlOrigin = urlObj.origin;
    } catch {
      console.error('Invalid URL:', imageUrl);
      return new NextResponse(null, { status: 400 });
    }

    // Check if domain is allowed
    if (!ALLOWED_DOMAINS.includes(urlObj.hostname)) {
      console.error(`Domain not allowed: ${urlObj.hostname}`);
      return NextResponse.json(
        { error: 'Domain not allowed', domain: urlObj.hostname },
        { status: 403 }
      );
    }

    console.log('Proxying image:', imageUrl);

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': urlOrigin + '/',
        'Origin': urlOrigin,
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`Image proxy failed for ${imageUrl}: ${response.status}`);
      return new NextResponse(null, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Check if response is actually an image
    if (!contentType.startsWith('image/')) {
      console.error(`Non-image content type for ${imageUrl}: ${contentType}`);
      return new NextResponse(null, { status: 415 });
    }

    console.log(`Successfully proxied image: ${imageUrl} (${contentType})`);

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse(null, { status: 500 });
  }
}
