const mongoose=require("mongoose")
const Schema =mongoose.Schema



const PresentSchema=new Schema({
    presence:String,
    day:String,
    date:String,
    time:String,
    department:String,
    group:String,
    shift:String,
    semester:String,
    name:String,
    roll:String,
    registration:String,
    subjectName:String,
    subjectCode:String,
    teacherCode:String
})

const Presence=mongoose.model('presence',PresentSchema)
module.exports = Presence

