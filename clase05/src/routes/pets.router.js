const router = require('express').Router();

const pets = [];

router.get('/', (req, res) => res.status(200).json({ data: pets }));
router.post('/', (req, res) => {
	const newPet = req.body;
	pets.push(newPet);
	res.status(200).json({ message: 'Pet added succesfully' });
});

module.exports = router;
