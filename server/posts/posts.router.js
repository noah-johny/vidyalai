const express = require('express');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  // Fetch posts
  const posts = await fetchPosts();
  console.log('posts', posts);

  res.json(posts);
});

module.exports = router;
