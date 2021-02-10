const mongoose = require("mongoose")
const Schema = mongoose.Schema



const QuizeSchema = new Schema({
    teacherId:String,
    quizName:String,
    access:String,
    image:String,
    questions: [{
       question:String,
       option1:String,
       option2:String,
       option3:String,
       option4:String,
       answerNr:String,
       mark:String
    }]

})

const Quize = mongoose.model('quizes', QuizeSchema)
module.exports = Quize

