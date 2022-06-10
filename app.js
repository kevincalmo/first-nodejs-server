const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const orderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
        ;
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

/*********************************************************/
/* User relation */
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'Cascade'
});
User.hasMany(Product);
/* Cart relation */
User.hasOne(Cart);
Cart.belongsTo(User, {
    constraints: true,
    onDelete: 'Cascade'
});
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

/* Order relation */
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: orderItem });
/*********************************************************/

app.use(errorController.get404);
sequelize.sync()
    .then(result => {
        return User.findByPk(1);
        /* app.listen(3000); */
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'max',
                email: 'test@test.com'
            });
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        user.createCart();
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


