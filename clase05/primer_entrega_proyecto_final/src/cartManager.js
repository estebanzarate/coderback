const fs = require('fs');

class CartManager {
	constructor(path) {
		this.path = path;
		this.carts = [];
	}
	addCart = async () => {
		try {
			this.carts = await this.getCarts();
			const id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
			this.carts.push({ id, products: [] });
			return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
		} catch (error) {
			fs.writeFileSync(this.path, JSON.stringify(this.carts));
			return error;
		}
	};
	getCarts = async () => {
		try {
			return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		} catch (error) {
			if (error.errno === -4058) fs.writeFileSync(this.path, JSON.stringify(this.products));
			return this.products;
		}
	};
}

module.exports = CartManager;
