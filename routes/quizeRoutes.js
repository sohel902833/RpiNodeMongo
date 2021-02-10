const router=require("express").Router()
const quizeController=require("../controller/quizController")
router.post('/',quizeController.addnewQuize)
router.post('/image/:id',quizeController.updateImage)
router.put('/:quizId',quizeController.updateQuiz)
router.delete('/:id',quizeController.deleteQuiz)
router.post('/question/:id', quizeController.addNewQuestion)
router.put('/question/:id/:qid', quizeController.updateQuestion)
router.delete('/question/:id/:qid', quizeController.deleteQuestion)
router.get('/teacher/:id',quizeController.getTeacherQuizes)
router.get('/question/:id',quizeController.getQuizQuestion)




module.exports=router