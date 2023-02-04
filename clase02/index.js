class ProducManager {
	constructor() {
		this.products = [];
	}
	addProduct = ({ title, description, price, thumbnail, code, stock }) => {
		if (!title || !description || !price || !thumbnail || !code || !stock)
			return '[!] All fields are required';
		if (
			title == ' ' ||
			description == ' ' ||
			price == ' ' ||
			thumbnail == ' ' ||
			code == ' ' ||
			stock == ' '
		)
			return '[!] All fields are required';
		const codeExists = this.products.some(product => product.code === code);
		if (codeExists) return '[!] Code already exists';
		const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
		this.products.push({ id, title, description, price, thumbnail, code, stock });
	};
	getProducts = () => this.products;
	getProductById = id => this.products.find(product => product.id === id) || '[!] Not Found';
}

const productManager = new ProducManager();

productManager.addProduct({
	title: 'producto prueba',
	description: 'Este es un producto prueba',
	price: 200,
	thumbnail: 'Sin imagen',
	code: 'abc123',
	stock: 25
});
