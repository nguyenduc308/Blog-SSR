const express = require('express');
const router = express.Router();
const {checkAdmin} = require('../middleware/auth')
const userControllers = require('../controllers/users');
router.get('/',userControllers.getAllUsers);
//Search
router.get('/search',userControllers.searchUsers)
//Create reg page
router.get('/reg',checkAdmin, userControllers.getRegUser)
//Create a user
router.post('/reg',userControllers.valid,userControllers.regUser)
//Get userid
router.get('/:userId', userControllers.getUser)

module.exports = router;