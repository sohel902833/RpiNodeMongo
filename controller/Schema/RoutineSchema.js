const mongoose = require('mongoose')

const Schema = mongoose.Schema
const RoutineSchema = new Schema({
    startTime: {
        type: String,
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    day: {
        type: String,
        trim: true,
    },
    teacherName: {
        type: String
    },
    roomNumber: {
        type: String
    },
    teacherCode: String,
    department: String,
    groups: String,
    shift: String,
    semester: String,
    period: String,
    subjectCode: String,
    serial: String
})
const Routine = mongoose.model('routines', RoutineSchema)
module.exports = Routine