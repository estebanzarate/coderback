const ProductManager = require('./');

const productManager = new ProductManager('./db/db.json');

productManager
	.updateProduct(3, {
		title: 'producto de prueba4',
		stock: 50
	})
	.then(res => console.log(res));
