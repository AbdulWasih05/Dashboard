'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

export default function TestPage() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to connect to test endpoint',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            TMDB API Configuration Test
          </h1>
          <p className="text-foreground/60 mb-6">
            Test if your TMDB API key is configured correctly
          </p>

          <Button onClick={testAPI} isLoading={loading} size="lg">
            {loading ? 'Testing...' : 'Test API Key'}
          </Button>

          {result && (
            <div className="mt-8">
              <div
                className={`p-6 rounded-lg border-2 ${
                  result.success
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">
                    {result.success ? '✅' : '❌'}
                  </span>
                  <div className="flex-1">
                    <h2
                      className={`text-xl font-bold mb-2 ${
                        result.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                      }`}
                    >
                      {result.success ? 'Success!' : 'Error'}
                    </h2>
                    <p
                      className={`mb-4 ${
                        result.success ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                      }`}
                    >
                      {result.message}
                    </p>

                    {result.details && (
                      <div className="mt-4 space-y-2 text-sm">
                        <p className="text-foreground">
                          <strong>API Key:</strong> {result.details.apiKeyPrefix}
                        </p>
                        <p className="text-foreground">
                          <strong>Movies Retrieved:</strong>{' '}
                          {result.details.moviesRetrieved}
                        </p>
                        {result.details.sampleMovie && (
                          <div className="mt-3 p-3 bg-background rounded border border-border">
                            <p className="font-medium text-foreground mb-1">
                              Sample Movie Retrieved:
                            </p>
                            <p className="text-foreground/80">
                              {result.details.sampleMovie.title} (
                              {result.details.sampleMovie.releaseDate})
                            </p>
                            <p className="text-foreground/80">
                              Rating: {result.details.sampleMovie.rating}/10
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {result.error && (
                      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded">
                        <p className="text-sm font-mono text-red-800 dark:text-red-300">
                          {result.error}
                        </p>
                      </div>
                    )}

                    {(result.instructions || result.nextSteps) && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-foreground mb-2">
                          {result.success ? 'Next Steps:' : 'Instructions:'}
                        </h3>
                        <ul className="space-y-1 text-sm text-foreground/80">
                          {(result.instructions || result.nextSteps).map(
                            (instruction: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{instruction}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-accent rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">
              How to get your TMDB API Key:
            </h3>
            <ol className="space-y-2 text-sm text-foreground/80">
              <li>1. Go to <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">themoviedb.org/signup</a> and create a free account</li>
              <li>2. Navigate to <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Settings → API</a></li>
              <li>3. Request an API key (choose "Developer" option)</li>
              <li>4. Copy your API Key (v3 auth)</li>
              <li>5. Create a <code className="px-1 py-0.5 bg-background rounded">.env.local</code> file in the root directory</li>
              <li>6. Add: <code className="px-1 py-0.5 bg-background rounded">TMDB_API_KEY=your_api_key_here</code></li>
              <li>7. Restart the development server</li>
            </ol>
          </div>

          <div className="mt-6 flex space-x-4">
            <a href="/" className="text-primary-500 hover:underline">
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
