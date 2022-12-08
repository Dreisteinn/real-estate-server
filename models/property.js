require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
const propertySchema = new mongoose.Schema({
	images: [String],
	details: {
		parking: { type: Number, required: true },
		bathroom: { type: Number, required: true },
		room: { type: Number, required: true },
		garage: { type: Number, required: true },
		dateAdded: String,
	},
	description: { type: String, required: true },
	propertyType: { type: String, required: true },
	address: { type: String, required: true },
	location: { type: String, required: true },
	transactionType: { type: String, required: true },
	price: { type: Number, required: true },
	area: { type: Number, required: true },
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
	publisher_id: {
		type: String,
		require: true,
	},
	publisher: {
		name: { type: String, required: true },
		number: { type: String, required: true },
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

mongoose.connect(URI).catch((e) => console.log(e.message));

propertySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Property', propertySchema);
