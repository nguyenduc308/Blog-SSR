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
    //post.content = JSON.stringify(post.content)
    console.log(post.content)
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
    const {title, editor} = req.body;
    const date = Date.now();
    if(!title || !editor) {
       return res.render('./posts/create', {
            errors: ["Title and content are required"],
            value: req.body
        })

    }
    db.get('posts').push({id:postId,title: title, content:editor, date: date,user:name, useId:id}).write()
    res.redirect('/posts')
}