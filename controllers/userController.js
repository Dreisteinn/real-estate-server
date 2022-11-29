const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user.id);
		res.status(200).json({ email, token, name: user.name });
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
};

const signupUser = async (req, res) => {
	const { password, email, name } = req.body;
	try {
		const user = await User.signup(email, password, name);
		const token = createToken(user.id);
		res.status(201).json({ email, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = { loginUser, signupUser };
