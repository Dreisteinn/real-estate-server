const User = require('../models/user');
const Property = require('../models/property');
const jwt = require('jsonwebtoken');
const Message = require('../models/message');

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
		res.status(200).json(posts);
	}
};

const handleMessage = async (req, res) => {
	const { text, subject, from, to } = req.body;
	console.log(req.body);
	try {
		const message = await Message.create({ text, subject, from, to });
		res.status(201).json(message);
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
};

const getUserMessage = async (req, res) => {
	const { userid } = req.headers;
	const messages = await Message.find({ to: userid });
	console.log(messages);
	if (messages) {
		messages.length > 0
			? res.status(200).json(messages)
			: res.status(404).json({ message: 'შეტყობინებები ვერ მოიძებნა!' });
	} else {
		res.status(401).json({ message: 'ცუდი მოთხოვნა!' });
	}
};

const deleteMessage = async (req, res) => {
	const user_id = String(req.user._id);
	const { id } = req.params;
	const msg = await Property.findOneAndDelete({ _id: id, to: user_id });
	console.log(msg);
	res.status(200).json({ message: 'Property has been deleted' });
};

module.exports = { loginUser, signupUser, getUserPosts, handleMessage, getUserMessage, deleteMessage };
