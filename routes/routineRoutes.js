var router=require("express").Router()
var routineController=require("../controller/routineController")

router.post('/',routineController.saveNewRoutine)
router.get('/:department/:group/:shift/:semester', routineController.getClassRoutine)
router.get('/teacherroutine/:day/:code',routineController.getTeacherDayRoutine)



module.exports=router