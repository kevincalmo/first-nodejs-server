const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //Analyse the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            let updateProduct;
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.quantity = updateProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return;
            //update cart
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.findIndex(prod => prod.id === id);
            if (!product) return;
            const productQty = product.quantity;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    };

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }

        });
    }

}