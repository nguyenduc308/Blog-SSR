const db = require('../database/db')
const bcrypt = require('bcrypt')
module.exports.login =(req,res)=> {
    res.render('./users/login', {
        title: "Login"
    })
}
module.exports.authLogin =async (req,res)=> {
    const {email, password}  = req.body;
    let user =  db.get('users').find({email:email}).value()
    if(!user) {
        return res.render("./users/login", {
            errors: [
                "Email or password incorrected"
            ],
            value: req.body
        })
    }
    const isMatch =await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.render("./users/login", {
            errors: [
                "Email or password incorrected"
            ],
            value: req.body
        })
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    console.log(req.url)
    res.render('index', {
        user:user
    })

}