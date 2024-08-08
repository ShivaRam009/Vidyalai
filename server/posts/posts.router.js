const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithUserAndImagesPromises = posts.map(async (post) => {
      const [photosResponse, userResponse] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`),
        fetchUserById(post.userId)
      ]);

      const images = photosResponse.data.slice(0, 3).map(photo => ({ url: photo.url }));
      const user = userResponse;

      return {
        ...post,
        images,
        user: {
          initials: `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`, // Initials
          name:user.name,
          email: user.email
        }
      };
    });

    const postsWithUserAndImages = await Promise.all(postsWithUserAndImagesPromises);

    res.json(postsWithUserAndImages);
  } catch (error) {
    console.error('Error fetching posts or images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
