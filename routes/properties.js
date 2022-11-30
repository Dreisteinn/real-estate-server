const express = require('express');
const router = express.Router();
const { createNewProperty, removeProperty, getProperty, getProperties } = require('../controllers/propertyController');
const protectRoute = require('../middleware/protectRoute');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', protectRoute, createNewProperty);
router.delete('/:id', protectRoute, removeProperty);

module.exports = router;
