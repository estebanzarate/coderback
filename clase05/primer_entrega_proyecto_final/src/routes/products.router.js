const router = require('express').Router();
const ProductManager = require('../productManager');

const productManager = new ProductManager('src/db/products.json');

router.get('/', async (req, res) => {
	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).json(products.slice(0, limit));
	res.status(200).json(products);
});

router.get('/:pid', async (req, res) => {
	const id = Number(req.params.pid);
	const product = await productManager.getProductById(id);
	if (!product) return res.status(404).json({ message: '[!] Product not found' });
	res.status(200).json(product);
});

router.post('/', async (req, res) => {
	await productManager.addProduct(req.body);
	res.status(200).json({ message: 'Product added successfully' });
});

router.put('/:pid', async (req, res) => {});

router.delete('/:pid', async (req, res) => {});

module.exports = router;
