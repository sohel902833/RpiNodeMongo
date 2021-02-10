var router=require("express").Router()
var presentController=require("../controller/presentController")

router.post('/',presentController.addnewPresent)
router.get('/', presentController.getAllPresent)
router.delete('/:id', presentController.deletePresent)
router.put('/:id', presentController.updatePresent)
router.get('/:department/:group/:semester/:shift/:roll/:registration/:subjectCode/:teacherCode', presentController.getStudentPresent)
router.get('/:department/:group/:semester/:shift/:subjectCode/:teacherCode', presentController.getStudentPresentPercent)

module.exports=router