const axios = require('axios');

/**
 * Fetches posts and their images from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts with images.
 */
async function fetchPosts(params) {
  try {
    const { start = 0, limit = 10 } = params || {};

    // Fetch posts
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          _start: start,
          _limit: limit,
        },
      },
    );

    // Fetch posts with images
    const postsWithImages = await Promise.all(
      posts.map(async post => {
        try {
          const { data: images } = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
          );
          return {
            ...post,
            images: images.map(image => ({ url: image.url })),
          };
        } catch (error) {
          console.error(`Error fetching images for post ${post.id}:`, error);
          return post;
        }
      }),
    );

    return postsWithImages;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

module.exports = { fetchPosts };
