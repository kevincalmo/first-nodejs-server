const products = [];
const userData = require('../routes/user');

exports.getProduct = (req, res, next) => {
    res.render('product');
}

exports.postNewProduct = (req, res, next) => {
    console.log(req.body);
    products.push({title: req.body.title});
    console.log(products);
    res.redirect('/');
}

exports.getHomePage = (req, res, next) => {
    res.render('shop', {
        products: products,
        pageTitle: 'Home Page',
        users: userData.users
    });
}