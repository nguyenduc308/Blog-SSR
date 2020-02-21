const express = require('express');
const router = express.Router()
const {requireAuth} = require('../middleware/auth')
router.get('/',requireAuth, (req,res)=> {
    res.render('index')
})
router.get('/about', (req,res) => {
    res.render('about', {
        title: "About"
    })
})
router.use('/users',requireAuth, require('./user'));
router.use('/auth', require('./auth'));

router.use('/posts', require('./post'));
module.exports = router
