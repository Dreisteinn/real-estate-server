const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getUserPosts, handleMessage, getUserMessage } = require('../controllers/userController');
const protectedRoute = require('../middleware/protectRoute');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/posts', protectedRoute, getUserPosts);
router.get('/messages', protectedRoute, getUserMessage);
router.post('/messages', protectedRoute, handleMessage);

module.exports = router;
