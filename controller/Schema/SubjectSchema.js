var mongoose=require("mongoose")
const Schema=mongoose.Schema


const SubjectSchema=new Schema({
    name:String,
    code:{
        type:String
    },
    department:String,
    semester:String
})
const Subject = mongoose.model('subjects', SubjectSchema)
module.exports = Subject