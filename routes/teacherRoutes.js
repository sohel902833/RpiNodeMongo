var router=require("express").Router()
var teacherController=require("../controller/teacherController")
const multer = require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
            cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
})

const upload = multer({
    storage:storage
})


router.post('/',teacherController.addnewTeacher)
router.put('/:id',teacherController.updateTeacher)
router.delete('/:id',teacherController.deleteTeacher)
router.get('/',teacherController.getAllTeacher)
router.get('/:department',teacherController.getDepartmentTeacher)
router.get('/get/code',teacherController.getAllTeacherCode)
router.get('/get/:code/:department', teacherController.getspecificteacher)
//router.post('/image',upload.single('teacherImage'), teacherController.updateImage)
router.post('/image/:teacherCode/:department', teacherController.updateImage)



module.exports=router