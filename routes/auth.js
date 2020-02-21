const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');

router.get('/login', authControllers.login);
router.post('/login', authControllers.authLogin);

module.exports = router;