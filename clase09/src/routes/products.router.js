const router = require('express').Router();
const ProductManager = require('../dao/productManager.mongo');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).render('products', { products: products.slice(0, limit) });
	res.status(200).render('products', { products });
});

router.get('/:pid', async (req, res) => {
	const product = await productManager.getProduct(req.params.pid);
	if (!product) return res.status(404).render('home', { message: '[!] Product not found' });
	res.status(200).render('product', { product });
});

router.post('/', async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;
	if (!title || !description || !code || !price || !stock || !category)
		return res.status(400).json({ message: '[!] All fields are required' });
	await productManager.addProduct(req.body);
	res.status(200).json({ message: 'Product added successfully' });
});

router.put('/:pid', async (req, res) => {
	await productManager.updateProduct(req.params.pid, req.body);
	res.status(200).json({ message: 'Product updated successfully' });
});

router.delete('/:pid', async (req, res) => {
	await productManager.deleteProduct(req.params.pid);
	res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router;
