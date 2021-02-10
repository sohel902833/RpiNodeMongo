
var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors")
var app = express()
var URL = "mongodb+srv://sohelrana902833:gBkhKgWawCmg3oWZ@cluster0.kbxpx.mongodb.net/rpi?retryWrites=true&w=majority";
var config = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:true}

const mongoose = require('mongoose');
mongoose.connect(URL,config)

const db=mongoose.connection
db.on('error',(err)=>{
    console.log(err)
})
mongoose.connection.once('open', function () {
    console.log('Database connected asdf');
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/user',require("./routes/userRoutes"))
app.use('/teacher',require("./routes/teacherRoutes"))
app.use('/student',require("./routes/studentRoutes"))
app.use('/routine',require("./routes/routineRoutes"))
app.use('/present',require("./routes/presentRoutes"))
app.use('/subject',require("./routes/subjectRoutes"))
app.use('/quiz',require("./routes/quizeRoutes"))
app.use('/quizanswer',require("./routes/quizAnswerRoutes"))


app.get('/', (req, res, next) => {
    res.json("message hellos")
})
const PORT = process.env.PORT || 4002

app.listen(PORT, () => {
    console.log(`Server is Running On Port ${PORT}`)

})