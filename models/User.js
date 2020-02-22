const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: Number, default: 3}
})
const User = mongoose.model('User', UserSchema, 'users')

module.exports = {
    UserSchema, User
}
