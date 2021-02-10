const Teacher=require("./Schema/teacherSchema")
const Users=require("./Schema/UserSchema")


getspecificteacher=(req,res,next)=>{
    let { code, department } = req.params

    Teacher.find({code:`${code}`,departmentname:`${department}`})
        .then(result=>{
            if(result.length>0){
                let send = {
                    name: result[0].name,
                    departmentname: result[0].departmentname,
                    code: result[0].code,
                    phone: result[0].phone
                }


                res.json({
                    l: "d",
                    send
                }) 
            }else{
                res.json({
                    l: "e",
                    message: "We Can\'t Find Any Teacher With this Code And Department.Please Check And Try again"
                })
            }
        }).catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            })
        })




}
addnewTeacher=(req,res,next)=>{
    let { name, code, departmentname, image, phone } = req.body
        const newTeacher=new Teacher({
            name,
            code,
            departmentname,
            image,
            phone
        })


        newTeacher.save()
            .then(result=>{
                res.json({
                    r: "d",
                    message: "Data Insert Successfull",
                    result
                })
            })
            .catch(error=>{
                if (error.keyValue.phone){
                    res.json({
                        message: "This Phone Number Is Already Used",
                        r: "p"
                    })
                }else if(error.keyValue.code){
                    res.json({
                        message: "This Teacher is Already Exists",
                        r: "u"
                    }) 
                }
            })
}


deleteTeacher=(req,res,next)=>{
    let id = req.params.id

    Teacher.findByIdAndRemove(id).then(result=>{
        res.json({
            message:"Delete Successful",
            result
        })
    }).catch(error=>{
        res.json({
            message:"Server Error Found",
            error
        })
    })

}

updateTeacher=(req,res,next)=>{
    let id = req.params.id
    let { name, code, departmentname, image, phone } = req.body

    let updatedTeacher={
        name,
        code,
        departmentname,
        image,
        phone
    }

    Teacher.findByIdAndUpdate(id,{$set:updatedTeacher})
        .then(result=>{
            res.json({
                message: "Teacher Update Successfull",
            })
        }).catch(error=>{
            res.json({
                message: "server Error ocured"
            })
        })



}


getAllTeacher=(req,res,next)=>{
   Teacher.find({})
    .then(result=>{
        res.json({result})
    }).catch(error=>{
        res.json({
            message:"Server Error Found",
            error
        })
    })
}

getAllTeacherCode=(req,res,next)=>{
    Teacher.find({},{code:1,name:1})
        .then(result => {
            res.json({ result })
        }).catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })
 
}



getDepartmentTeacher=(req,res,next)=>{
    var dep = req.params.department 
    Teacher.find({departmentname:`${dep}`})
        .then(result => {
            res.json({ result })
        }).catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })

}
updateImage=(req,res,next)=>{
    let { teacherCode, department } = req.params
    let image = req.body.image
    let updateImage={image}
    Teacher.findOneAndUpdate({ code: `${teacherCode}`, departmentname:`${department}`},{$set:updateImage })
    .then(result=>{
        Users.findOneAndUpdate({ teacherCode: `${teacherCode}`, department: `${department}` }, { $set: updateImage })   
       
        .then(result=>{
              res.json({
                message:"Updated Successfully",
                result
            })
        })
      

        }).catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            })
        })




}







module.exports={
    addnewTeacher,
    deleteTeacher,
    updateTeacher,
    getAllTeacher,
    getDepartmentTeacher,
    getAllTeacherCode,
    getspecificteacher,
    updateImage
}