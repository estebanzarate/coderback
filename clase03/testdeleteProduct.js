const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager.deleteProduct(2).then(res => console.log(res));
