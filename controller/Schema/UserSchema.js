const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    institutename: {
        type: String,
        trim: true,
    },
    image: {
        type: String
    },
    gender: {
        type: String
    },
    usertype: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    teacherCode: {
        type: String,
        unique:true
    },
    department: {
        type: String
    }
})
const User = mongoose.model('users', UserSchema)
module.exports = User