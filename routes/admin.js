const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');

const products = [];

router.use('/product-page', (req, res, next) => {
res.render('product');
});

//le middleware sera en poste sur /product
router.post('/product', (req, res, next) => {
    console.log(req.body);
    products.push({title: req.body.title});
    console.log(products);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;// j'xporte le tableau pour qu'il soit accessible partout