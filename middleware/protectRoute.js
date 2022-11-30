const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protectRoute = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		res.status(401).json({ error: 'ავტორიზაციის ტოკენი ვერ მოიძებნა!' });
	}
	if (authorization) {
		const token = authorization.split(' ')[1];
		try {
			const { id } = jwt.verify(token, process.env.SECRET);
			req.user = await User.findOne({ id }).select('-password');
			next();
		} catch (e) {
			console.log(e.message);
			res.status(401).json({ error: 'დაფიქსირდა არაავტორიზებული მოთხოვნა!' });
		}
	}
};

module.exports = protectRoute;
