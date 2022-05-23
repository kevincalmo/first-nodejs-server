const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');
const productsController = require('../controllers/products');

router.use('/product-page', productsController.getProduct);

//le middleware sera en poste sur /product
router.post('/product', productsController.postNewProduct);

exports.routes = router;