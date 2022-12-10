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
				const resp = await cloudinary.uploader.upload(image, { folder: 'properties' });
				urlsOfImages.push({ url: resp.url, public_id: resp.public_id });
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
	const user_id = String(req.user._id);
	const { id } = req.params;
	try {
		const { images } = await Property.findOneAndDelete({ _id: id, publisher_id: user_id });
		for (image of images) {
			await cloudinary.uploader.destroy(image['public_id'], (error, result) => {
				if (error) {
					throw new Error(error);
				}
				return result;
			});
		}
		res.status(200).json({ message: 'განცხადება წაიშალა!' });
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
};

const getProperty = async (req, res) => {
	const { id } = req.params;
	const property = await Property.findById(id);
	if (!property) {
		return res.status(404).json({ error: 'განცხადება ასეთი id-ით ვერ მოიძებნა!' });
	}
	res.status(200).json({ property });
};

module.exports = { createNewProperty, removeProperty, getProperty, getProperties };
