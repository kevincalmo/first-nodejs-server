const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');
const userData = require('./routes/user');
const bodyParser = require('body-parser');
const path = require('path');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));//donne accès au fichier du dossier public 'public'

app.use('/admin', adminData.routes); // '/admin' est un filtre, toute les routes de adminRoute seront accessibles avec le prefixe /admin/nom_route_adminRoute
app.use(shopRoute);
app.use('/user',userData.routes);

//Faire une page 404
app.use('*', (req, res, next) => {
    console.log('hello');
    res.status(404).render('404', { pageTitle: 'Page non trouvé :(' });
});

app.listen(3000);