const router = require('express').Router();
const CartManager = require('../cartManager');

const cartManager = new CartManager('src/db/carts.json');

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Cart added successfully' });
});

router.get('/:cid', async (req, res) => {
	const cart = await cartManager.getCartById(Number(req.params.cid));
	if (!cart) return res.status(404).json({ message: '[!] Cart not found' });
	res.status(200).json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {});

module.exports = router;
