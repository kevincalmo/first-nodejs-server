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
    /* On rajoute les informations dans la fonction callback 
    car sinon la fonction seule renvoie null */
    const products = Product.fetchAll((products) => {
        res.render('shop', {
            products: products,
            pageTitle: 'Home Page',
            users: userData.users
        });
    });

}