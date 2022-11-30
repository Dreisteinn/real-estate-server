const User = require('../models/user');
const Property = require('../models/property');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user.id);
		res.status(200).json({ email, token, name: user.name, number: user.number, id: user.id });
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
};

const signupUser = async (req, res) => {
	const { password, email, name, number } = req.body;
	try {
		const user = await User.signup(email, password, name, number);
		const token = createToken(user.id);
		res.status(201).json({ email, token, name: user.name, number: user.number });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getUserPosts = async (req, res) => {
	const userId = String(req.user._id);
	const posts = await Property.find({ publisher_id: userId });
	if (!posts) {
		res.status(404).json({ error: 'განცხადებები ვერ მოიძებნა!' });
	} else {
		res.status(200).json({ posts });
	}
};

module.exports = { loginUser, signupUser, getUserPosts };
