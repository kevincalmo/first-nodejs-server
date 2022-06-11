const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  /* save all products in the database */
  save() {
    const db = getDb();
    db.collection('products').insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }
  /* fetch all products */
  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .toArray()
      .then(product => {
        return product;
      })
      .catch(err => console.log(err));
  }
}
module.exports = Product;