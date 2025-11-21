/**
 * API Test Script
 * Run with: node scripts/test-apis.js
 *
 * Make sure your dev server is running on localhost:3000
 */

const BASE_URL = 'http://localhost:3000';

async function testNewsAPI() {
  console.log('\n📰 Testing News API...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/news/top-headlines?category=general&page=1`);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      const firstArticle = data.articles[0];

      // Check if it's mock data
      const isMock = firstArticle.id?.startsWith('mock-');

      console.log('Status:', response.status);
      console.log('Total Results:', data.totalResults);
      console.log('Articles Count:', data.articles.length);
      console.log('Data Source:', isMock ? '⚠️  MOCK DATA' : '✅ REAL API (NewsAPI.org)');
      console.log('\nFirst Article:');
      console.log('  ID:', firstArticle.id);
      console.log('  Title:', firstArticle.title?.substring(0, 60) + '...');
      console.log('  Source:', firstArticle.source?.name);
      console.log('  Author:', firstArticle.author || 'N/A');

      if (isMock) {
        console.log('\n⚠️  You are using MOCK DATA.');
        console.log('To use real news, add NEWS_API_KEY to .env.local');
      }
    } else {
      console.log('❌ No articles returned');
    }
  } catch (error) {
    console.error('❌ News API Error:', error.message);
  }
}

async function testTMDBAPI() {
  console.log('\n🎬 Testing TMDB API...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/tmdb/popular?page=1`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const firstMovie = data.results[0];

      console.log('Status:', response.status);
      console.log('Total Results:', data.total_results);
      console.log('Movies Count:', data.results.length);
      console.log('Data Source:', '✅ REAL API (TMDB)');
      console.log('\nFirst Movie:');
      console.log('  ID:', firstMovie.id);
      console.log('  Title:', firstMovie.title);
      console.log('  Rating:', firstMovie.vote_average);
      console.log('  Release:', firstMovie.release_date);
    } else {
      console.log('❌ No movies returned');
      if (data.error) {
        console.log('Error:', data.error);
      }
    }
  } catch (error) {
    console.error('❌ TMDB API Error:', error.message);
  }
}

async function testMovieDetailsAPI() {
  console.log('\n🎥 Testing Movie Details API...\n');

  try {
    // Test with a known movie ID (e.g., The Matrix = 603)
    const movieId = 603;
    const response = await fetch(`${BASE_URL}/api/tmdb/movie/${movieId}`);
    const data = await response.json();

    if (data.id) {
      console.log('Status:', response.status);
      console.log('Movie ID:', data.id);
      console.log('Title:', data.title);
      console.log('Overview:', data.overview?.substring(0, 100) + '...');
      console.log('Rating:', data.vote_average);
      console.log('✅ Movie Details API working correctly');
    } else {
      console.log('❌ Movie not found');
      if (data.error) {
        console.log('Error:', data.error);
      }
    }
  } catch (error) {
    console.error('❌ Movie Details API Error:', error.message);
  }
}

async function testSocialAPI() {
  console.log('\n💬 Testing Social Feed API...\n');

  try {
    const response = await fetch(`${BASE_URL}/api/social/feed?page=1`);
    const data = await response.json();

    if (data.posts && data.posts.length > 0) {
      const firstPost = data.posts[0];

      console.log('Status:', response.status);
      console.log('Posts Count:', data.posts.length);
      console.log('Has More:', data.hasMore);
      console.log('Data Source:', '⚠️  MOCK DATA (no real social API)');
      console.log('\nFirst Post:');
      console.log('  ID:', firstPost.id);
      console.log('  Username:', firstPost.username);
      console.log('  Content:', firstPost.content?.substring(0, 60) + '...');
      console.log('  Likes:', firstPost.likes);
    } else {
      console.log('❌ No posts returned');
    }
  } catch (error) {
    console.error('❌ Social API Error:', error.message);
  }
}

async function testWeatherAPI() {
  console.log('\n🌤️  Testing Weather API...\n');

  try {
    // Test with default coordinates (Bangalore)
    const response = await fetch(`${BASE_URL}/api/weather?latitude=12.9716&longitude=77.5946`);

    if (response.ok) {
      const data = await response.json();

      console.log('Status:', response.status);
      console.log('Data Source:', '✅ REAL API (Open-Meteo)');
      console.log('Location:', `${data.latitude}, ${data.longitude}`);
      console.log('Current Temperature:', data.current_weather?.temperature + '°C');
      console.log('Wind Speed:', data.current_weather?.windspeed + ' km/h');
    } else {
      console.log('❌ Weather API returned error:', response.status);
    }
  } catch (error) {
    console.error('❌ Weather API Error:', error.message);
  }
}

async function runAllTests() {
  console.log('='.repeat(50));
  console.log('🧪 API TEST SUITE');
  console.log('='.repeat(50));
  console.log('Make sure your dev server is running on localhost:3000\n');

  await testNewsAPI();
  await testTMDBAPI();
  await testMovieDetailsAPI();
  await testSocialAPI();
  await testWeatherAPI();

  console.log('\n' + '='.repeat(50));
  console.log('✅ All tests completed');
  console.log('='.repeat(50) + '\n');
}

runAllTests();
