const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager
	.updateProduct(1, {
		title: 'product 1 actualizado',
		stock: 200
	})
	.then(res => console.log(res));
