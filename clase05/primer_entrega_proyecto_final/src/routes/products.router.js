const router = require('express').Router();
const ProductManager = require('../productManager');

const productManager = new ProductManager('src/db/products.json');

router.get('/', async (req, res) => {
	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).json(products.slice(0, limit));
	res.status(200).json(products);
});

router.get('/:pid', async (req, res) => {});

router.post('/', async (req, res) => {});

router.put('/:pid', async (req, res) => {});

router.delete('/:pid', async (req, res) => {});

module.exports = router;
