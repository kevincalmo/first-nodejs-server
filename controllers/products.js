const Product = require('../models/product');
const userData = require('../routes/user');

exports.getProduct = (req, res, next) => {
    res.render('product');
}

exports.postNewProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getHomePage = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        products: products,
        pageTitle: 'Home Page',
        users: userData.users
    });
}