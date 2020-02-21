const db = require('../database/db')
module.exports.requireAuth = (req, res, next) => {
    if(!req.signedCookies.userId) {
        return  res.redirect('/auth/login');
    }
    const user = db.get('users').find({id:req.signedCookies.userId}).value();
    if(!user) {
        return res.redirect('/auth/login')
    }
    res.locals.user = user
    next();
}

module.exports.checkAdmin = (req, res, next) => {
    const adminId = "5a5442ed-89a8-463f-91d0-10be3dd80f8d"
    if(req.signedCookies.userId !== adminId) {
        return res.redirect('/')
    }
    next();
}

