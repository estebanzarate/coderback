const router = require('express').Router();
const CartManager = require('../cartManager');

const cartManager = new CartManager('src/db/carts.json');

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Cart added successfully' });
});

router.get('/:cid', (req, res) => {});

router.post('/:cid/product/:pid', (req, res) => {});

module.exports = router;
