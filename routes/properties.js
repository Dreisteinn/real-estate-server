const express = require('express');
const router = express.Router();
const { createNewProperty, removeProperty, getProperty, getProperties } = require('../controllers/propertyController');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', createNewProperty);
router.delete('/:id', removeProperty);

module.exports = router;
