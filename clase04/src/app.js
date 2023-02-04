const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./src/db/db.json');

app.get('/products', async (req, res) => {
	const limit = Number(req.query.limit);
	const products = await productManager.getProducts();
	if (limit) return res.status(200).json(products.slice(0, limit));
	res.status(200).json(products);
});

app.get('/products/:pid', async (req, res) => {
	const id = Number(req.params.pid);
	const product = await productManager.getProductById(id);
	if (!product) return res.status(404).json({ message: '[!] Product not found' });
	res.status(200).json(product);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
