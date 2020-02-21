const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt')
const db = require('../database/db')
module.exports.getAllUsers = (req, res) => {
    let {page} =req.query;
    page = parseInt(page) || 1
    let numUsersPerPage = 4;
    let end = page*numUsersPerPage;
    let begin = (page-1)*numUsersPerPage;
    let data = db.get('users').value().slice(begin,end)
    res.render('./users/', {
        data: data,
        title: "Users"
    })

}
//Search
module.exports.searchUsers = (req, res) => {
    const { q } = req.query

    let data = db.get('users').value();
    let matchData = data.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('./users/index', {
        data: matchData,
        q: q
    })
}
//Create
module.exports.getRegUser = (req, res) => {
    res.render('./users/register')
}
module.exports.valid = (req, res, next) => {
    let {name, email, password} = req.body;
    name=name.trim();
    email=email.trim();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isMatch = re.test(email.toLowerCase());
    let errors = [];
    if(!name||!password || !email) {
        errors.push("Name, password and email are required")
    }else if(name.length <3 || name.length >100) {
        errors.push("Name invalid")
    }else if( password.length < 6 ) {
        errors.push("Password must more than 6 words")
    } else if(!isMatch) {
        errors.push("Email invalid")
    }
    if(errors.length > 0) {
      return res.render('./users/register', {
            errors: errors,
            value: req.body
        })
    } 
    next()
}
module.exports.regUser = async (req, res) => {
    const id = uuidv4();
    const {name, email, password} = req.body;
    const user = db.get('users').find({email:email}).value();
    if(user) return res.render('./users/register', {
        errors: ["Email already exists"],
        value: req.body
    }) 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    db.get('users').push({id, name, email, password: hash}).write()
    res.redirect('/users')
}

module.exports.getUser = (req, res) => {
    const {userId} = req.params
    let user = db
                .get('users')
                .find({id:userId})
                .value();

    res.render('./users/profile', {
        user:user
    })
}


