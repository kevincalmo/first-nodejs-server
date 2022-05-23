const express = require('express');
const router = express.Router();
const adminData = require('../routes/admin');
const userData = require('../routes/user');

const path = require('path');
const rootDir = require('../utils/path');
const shopController = require('../controllers/products');

router.get('/', shopController.getHomePage);

module.exports = router;