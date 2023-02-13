const router = require('express').Router();
const uploader = require('../utils');

const users = [];

router.get('/', (req, res) => res.status(200).json({ data: users }));
router.post('/', uploader.single('thumbnail'), (req, res) => {
	const newUser = req.body;
	newUser.thumbnail = req.file.path;
	users.push(newUser);
	res.status(200).json({ message: 'User added succesfully' });
});

module.exports = router;
