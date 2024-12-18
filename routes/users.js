const { createUser, readUsers, readUser, deleteUser, updateUser } = require('../controllers/UsersController');
const validateToken = require('../middlewares/validateToken');
const express = require('express');
const router = express.Router();

router.get('/', readUsers);
router.post('/', createUser);
router.get('/:email', validateToken, readUser);
router.put('/:email', validateToken, updateUser);
router.delete('/:email', validateToken, deleteUser);

module.exports = router;