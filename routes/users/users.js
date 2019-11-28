const express = require('express');
const router = express.Router();

const {sayHi} = require('../../controllers/users/users');

router.get('/', sayHi);


module.exports = router;