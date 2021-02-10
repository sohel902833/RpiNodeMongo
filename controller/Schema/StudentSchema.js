const mongoose = require('mongoose')

const Schema = mongoose.Schema
const StudentSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    roll: {
        type: String,
        trim: true,
        unique: true
    },
    registration: {
        type: String,
        trim: true,
        unique: true
    },
    groups: {
        type: String
    },
    shifts: {
        type: String
    },
    department:String,
    image:String,
    phone:String,
    semester:String,
    r1:String,
    r2:String,
    r3:String,
    r4:String,
    r5:String,
    r6:String,
    r7:String,
    r8:String,
    quizes:[{
        quizId:String,
       teacherId:String,
        quizStatus:String,
        image:String,
        quizName:String,
        totalQuestion:String,
        time:String,
        endTime:String,
        subjectCode:String,
    }]
})
const Student = mongoose.model('students', StudentSchema)
module.exports = Student