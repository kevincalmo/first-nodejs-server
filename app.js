const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const userData = require('./routes/user');

const errorPageController = require('./controllers/error')

const bodyParser = require('body-parser');
const path = require('path');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));//donne accès au fichier du dossier public 'public'

app.use('/admin', adminRoute.routes); // '/admin' est un filtre, toute les routes de adminRoute seront accessibles avec le prefixe /admin/nom_route_adminRoute
app.use(shopRoute);
app.use('/user',userData.routes);

//Faire une page 404
app.use('*', errorPageController.errorPage);

app.listen(3000);