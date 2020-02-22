const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, require: true}
})
const Post = mongoose.model('Post', PostSchema, 'posts')

module.exports = {
    PostSchema, Post
}
