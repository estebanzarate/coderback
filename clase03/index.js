const fs = require('fs');

class ProducManager {
	constructor(path) {
		this.path = path;
		this.products = [];
	}
	addProduct = async product => {
		try {
			this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
			const id =
				this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
			this.products.push({ id, ...product });
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
			return 'Product added successfully';
		} catch (error) {
			return error;
		}
	};
	getProducts = async () => {
		try {
			return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		} catch (error) {
			if (error.errno === -4058) fs.writeFileSync(this.path, JSON.stringify(this.products));
			return this.products;
		}
	};
	getProductById = async id => {
		this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		return this.products.find(product => product.id === id) || 'Not Found';
	};
	updateProduct = async (id, data) => {
		this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		let prodToUpd = this.products.find(prod => prod.id === id);
		if (!prodToUpd) return 'Product not found';
		let prodIndex = this.products.findIndex(prod => prod.id === id);
		this.products[prodIndex] = { ...prodToUpd, ...data };
		await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		return 'Product updated successfully';
	};
	deleteProduct = async id => {
		this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		this.products = this.products.filter(prod => prod.id !== id);
		return 'Product removed succesfully';
	};
}

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProducManager('./db/db.json');

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
productManager.getProducts().then(res => console.log(res));

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
productManager
	.addProduct({
		title: 'producto prueba',
		description: 'Este es un producto prueba',
		price: 200,
		thumbnail: 'Sin imagen',
		code: 'abc123',
		stock: 25
	})
	.then(res => console.log(res));

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
productManager.getProducts().then(res => console.log(res));

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
productManager.getProductById(2).then(res => console.log(res));
productManager.getProductById(4).then(res => console.log(res));

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
productManager
	.updateProduct(1, {
		title: 'Updated product title',
		description: 'Updated description'
	})
	.then(res => console.log(res));
// productManager.getProducts().then(res => console.log(res));

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
productManager.deleteProduct(1).then(res => console.log(res));
