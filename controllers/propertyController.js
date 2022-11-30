const Property = require('../models/property');
const { cloudinary } = require('../utils/cloudinary');

const getProperties = async (req, res) => {
	const properties = await Property.find({});
	res.status(200).json(properties);
};

const createNewProperty = async (req, res) => {
	const user_id = String(req.user._id);
	try {
		const { images } = req.body;
		if (images) {
			let urlsOfImages = [];
			for (image of images) {
				const res = await cloudinary.uploader.upload(image, { folder: 'properties' });
				urlsOfImages.push(res.url);
			}
			const tempProperty = { ...req.body, images: urlsOfImages, publisher_id: user_id };
			const property = await Property.create(tempProperty);
			res.status(200).json(property);
		}
	} catch (e) {
		console.error(e.message);
		res.status(400).json({ error: e.message });
	}
};

const removeProperty = async (req, res) => {
	const { id } = req.params.id;
	const property = await Property.findOneAndDelete({ id });
	res.status(200).json({ message: 'Property has been deleted' });
};

const getProperty = async (req, res) => {
	const { id } = req.params;
	const property = await Property.findById(id);
	if (!property) {
		return res.status(404).json({ error: 'Property with this id not found' });
	}
	res.status(200).json({ property });
};

module.exports = { createNewProperty, removeProperty, getProperty, getProperties };
