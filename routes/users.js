const express = require('express');
const { createUser, getUsers, getUser } = require('../controllers/UsersController');
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:email', getUser);

module.exports = router;