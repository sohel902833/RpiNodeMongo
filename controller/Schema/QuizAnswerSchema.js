const mongoose = require('mongoose')

const Schema = mongoose.Schema
const AnswerSchema = new Schema({
    quizId:{
        type: String
    },
    department: {
        type: String
    },
    group: {
        type: String
    },
    shift: {
        type: String
    },
    semester: {
        type: String
    }, 
    subjectCode: {
        type: String
    },
    answers: [{
        roll:{
            type:String
        },
        registration:String,
        mark:String,
        timeSpent:String
    }]
})
const QAnswer = mongoose.model('answersquiz', AnswerSchema )
module.exports = QAnswer