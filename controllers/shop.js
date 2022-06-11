const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: prodId } })
        .then(products => {
          let product;
          if (products.length > 0) product = products[0];
          if (product) {
            //Ajout d'un produit déja existant dans un panier
            const oldQuantity = product.cartitems.quantity;
            newQuantity = oldQuantity + 1;
            return product;
          }
          //Ajout d'un produit non existant dans le panier
          return Product.findByPk(prodId)
        })
        .then(product => {
          return fetchCart.addProduct(product, { through: { quantity: newQuantity } })
        })
        .then(() => {
          res.redirect('/cart');
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
        .then(products => {
          const product = products[0];
          return product.cartitems.destroy()
            .then(result => {
              res.redirect('/cart');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchCart;
  req.user.getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      req.user.createOrder()
        .then(order => {
          return order.addProduct(products.map(product => {
            product.orderItem = { quantity: product.cartitems.quantity };
            return product;
          })
          );
        })
        .then(result => {
          //fetchCart.setProducts(null);
          res.redirect('/orders');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
