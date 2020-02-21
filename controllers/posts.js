const db = require('../database/db');
const uuidv4 = require('uuid/v4')
module.exports.getPosts =  (req, res)=>{
    const data = db.get('posts').value()
    res.render('./posts', {
        data: data,
        title: "All posts"
    })
}
module.exports.getPost = (req, res)=>{
    const {id} = req.params;
    const post = db.get('posts').find({id: id}).value();
    res.render('./posts/post', {
        data: [post],
        title: post.title
    })
}
module.exports.getCreatePost = (req, res) => {
    res.render('./posts/create', {
        title: "Create post"
    })
}
module.exports.createPost = (req, res) => {
    const postId = uuidv4();
    const {id,name} = res.locals.user;
    const {title, content} = req.body;
    const date = Date.now();
    if(!title || !content) {
       return res.render('./posts/create', {
            errors: ["Title and content are required"],
            value: req.body
        })

    }
    db.get('posts').push({id:postId,title: title, content:content, date: date,user:name, useId:id}).write()
    res.redirect('/posts')
}