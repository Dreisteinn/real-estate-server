require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
});

const URI = process.env.MONGO_URI;
mongoose.connect(URI).catch((err) => console.log(err.message));

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

userSchema.statics.signup = async function (email, password, name, number) {
	if (!email || !password || !name || !number) {
		throw Error('ყველა ველი უნდა იყოს შევსებული!');
	}
	if (!validator.isEmail(email)) {
		throw Error('მიუთითეთ ვალიდური ელ-ფოსტა!');
	}
	if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
		throw Error(
			'პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან და გამოყენებულ იქნას მინიმუმ ერთი ციფრი და მაღალი რეგისტრის ასო!'
		);
	}
	const exists = await this.findOne({ email });
	if (exists) {
		throw Error('მომხმარებელი ასეთი ელ-ფოსტით უკვე არსებობს!');
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ email, password: hash, name, number });
	return user;
};

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('ყველა ველი უნდა იყოს შევსებული!');
	}
	if (!validator.isEmail(email)) {
		throw Error('მიუთითეთ ვალიდური ელ-ფოსტა!');
	}
	const user = await this.findOne({ email });
	if (!user) {
		throw Error('მომხმარებელი ასეთი ელ-ფოსტით არ არსებობს!');
	}
	const matches = await bcrypt.compare(password, user.password);
	if (!matches) {
		throw Error('პაროლი არასწორია, სცადეთ ხელახლა!');
	}
	return user;
};

module.exports = mongoose.model('User', userSchema);
