const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager.updateProduct(1, {}).then(res => console.log(res));
