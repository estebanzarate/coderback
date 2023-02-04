const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager.getProducts().then(res => console.log(res));
