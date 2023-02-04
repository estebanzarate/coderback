const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager.getProductById(3).then(res => console.log(res));
