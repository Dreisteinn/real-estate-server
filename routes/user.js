const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getUserPosts } = require('../controllers/userController');
const protectedRoute = require('../middleware/protectRoute');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/posts', protectedRoute, getUserPosts);

module.exports = router;
