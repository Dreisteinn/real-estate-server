require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
const propertySchema = new mongoose.Schema(
	{
		images: [String],
		details: {
			parking: Number,
			bathroom: Number,
			room: Number,
			garage: Number,
			dateAdded: String,
		},
		description: String,
		propertyType: String,
		address: String,
		location: String,
		transactionType: String,
		price: Number,
		area: Number,
		features: {
			naturalGas: Boolean,
			ironDoor: Boolean,
			hotWater: Boolean,
			ac: Boolean,
			telephone: Boolean,
			washingMachine: Boolean,
			basement: Boolean,
			garage: Boolean,
			furniture: Boolean,
			alarm: Boolean,
			tv: Boolean,
			cableTv: Boolean,
			internet: Boolean,
			closet: Boolean,
			balcony: Boolean,
			fridge: Boolean,
			centralHeating: Boolean,
		},
		publisher: {
			name: String,
			number: String,
		},
	},
	{ timestamps: true }
);

mongoose.connect(URI).catch((e) => console.log(e.message));

propertySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Property', propertySchema);
