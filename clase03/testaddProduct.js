const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager.addProduct({ name: 'Manzana', price: 200 }).then(res => console.log(res));
