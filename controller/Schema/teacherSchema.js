const mongoose=require('mongoose')

const Schema=mongoose.Schema
const TeacherSchema=new Schema({
    name:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
        unique:true
    },
    code:{
        type:String,
        trim:true,
        unique:true
    },
    departmentname:{
        type:String
    },
    image:{
        type:String
    }
})
const Teacher=mongoose.model('teachers',TeacherSchema)
module.exports=Teacher