const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		text: { type: String, require: true },
		subject: { type: String, require: true },
		from: {
			email: { type: String, require: true },
			number: { type: String, require: true },
			name: { type: String, require: true },
			id: { type: String, require: true },
		},
		to: { type: String, require: true },
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const URI = process.env.MONGO_URI;
mongoose.connect(URI).catch((e) => console.log(e.message));

messageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Message', messageSchema);
