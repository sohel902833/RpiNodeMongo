const router=require("express").Router()
const quizAnswerController=require("../controller/quizAnswerController")
router.post('/submit/:id',quizAnswerController.publishNewAnswer)

module.exports=router