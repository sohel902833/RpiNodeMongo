var router=require("express").Router()
var subjectController=require("../controller/subjectController")

router.post('/', subjectController.addNewSubject)
router.delete('/:id', subjectController.deleteSubject)
router.get('/', subjectController.getAllSubject)
router.get('/:department/:semester', subjectController.getSpecificSubject)
router.get('/code/:department/:semester', subjectController.getSubjectCode)


module.exports=router