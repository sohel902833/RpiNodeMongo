var router = require("express").Router()
var studentController = require("../controller/studentController")

router.post('/',studentController.saveNewStudent)
router.put('/:id',studentController.updateStudent)
router.delete('/:id',studentController.deleteStudent)
router.get('/', studentController.getAllStudent)
router.get('/:roll/:reg', studentController.getsingleStudent)
router.get('/:department', studentController.getAllDepartmentStudent)
router.get('/:group/:shift/:department/:semester', studentController.getClassStudent)

router.post('/cns/:group/:shift/:department/:semester',studentController.changeStudentsSemester)
router.post('/quiz/:group/:shift/:department/:semester/:subjectCode',studentController.setQuiz)
router.get('/quiz/getquiz/:roll/:subjectCode',studentController.getSingleQuiz)
router.get('/quiz/classquiz/:group/:shift/:department/:semester/:subjectCode', studentController.getQuiz)
module.exports = router