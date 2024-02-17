const express = require('express');
const router = express.Router();

const getUsers = require('../api/users/getUsers');
const createUser = require('../api/users/createUser');

router.get('/get/:email', getUsers.getUser);
router.get('/get', getUsers.getUsers);
router.post('/create', createUser.createUser);
router.put('/create/:userId', createUser.updateUser);

module.exports = router;
