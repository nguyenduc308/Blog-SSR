const express = require('express');
const router = express.Router()
const {requireAuth} = require('../middleware/auth')
const postControllers = require('../controllers/posts')
router.get('/',postControllers.getPosts);
router.get('/create', requireAuth, postControllers.getCreatePost)
router.post('/create',requireAuth, postControllers.createPost)

router.get('/:id',postControllers.getPost);
module.exports = router
