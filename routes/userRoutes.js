var router=require("express").Router()
var userController=require("../controller/userController")

router.post('/login', userController.loginAdmin)
router.post('/loginstudent', userController.loginStudent)
router.post('/registerTeacher', userController.registerTeacher)
router.get('/getTeacher', userController.getAllTeacherUser)
router.post('/admin', userController.addAdmin)


module.exports=router