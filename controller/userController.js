const User = require("./Schema/UserSchema")
const Teacher = require("./Schema/teacherSchema")
const Student = require("./Schema/StudentSchema")


loginAdmin = (req, res, next) => {
    let { email, password, usertype } = req.body
    let firstQuery
    if(usertype=="teacher"){
        firstQuery={ phone: `${email}`, usertype: `${usertype}` }
    }else if(usertype=="admin"){
        firstQuery = { email: `${email}`, usertype: `${usertype}` }

    }

   User.find(firstQuery)
        .then(user=>{
            if(user.length>0){
                if (password != user[0].password) {
                    res.json({
                        message: "Password Doesn\'t Match",
                        "result": "p"
                    })
                } else {
                    if (usertype == "admin") {
                        send = {
                            id: user[0]._id,
                            name: user[0].name,
                            institutename: user[0].institutename,
                            image: user[0].image,
                            gender: user[0].gender,
                            usertype: user[0].usertype,
                            password: user[0].password,
                            email: user[0].email,
                            phone: user[0].phone
                        }



                        res.json({
                            message: "Login Successfull",
                            result: "d",
                            send
                        })
                    } else if (usertype == "teacher") {
                        let send = {
                            id: user[0]._id,
                            name: user[0].name,
                            departmentname: user[0].department,
                            code: user[0].teacherCode,
                            phone: user[0].phone
                        }


                        res.json({
                            message: "Login Successfull",
                            result: "d",
                            send
                        })
                    }

                }


            }else{
                res.json(
                    {
                        message: 'Incorrect Email', result: "e"
                    }
                )
            }
         })
         .catch(error=>{

        })








}


registerTeacher=(req,res,next)=>{
    let { name, teacherCode, phone, department, password, usertype } = req.body
   Teacher.find({code:`${teacherCode}`},{image:1})
    .then(teacherImages=>{
        
        console.log(teacherImages[0].image)
          let newUser=new User({
              name,
              teacherCode,
              phone,
              department,
              password,
              usertype,
              image:teacherImages[0].image
          })

          newUser.save()
            .then(result=>{
                let send = {
                    id: result._id,
                    name,
                    department,
                    code: teacherCode,
                    phone,
                    image:result.image
                }
                res.json(
                    {
                        result: "d",
                        message: "User Created Successfully",
                        send

                    }
                )    
            })
            .catch(error=>{
                if (error.keyValue.teacherCode){
                    res.json({
                        result: "c",
                        message: "User Already Exists"
                    })  
                }else{
                    res.json({
                        message: "Server Error Found"
                    })    
                }
            })   
    }).catch(error=>{
        res.json({
            message:"Server Error Found",
            error
        })
    })     


}



getAllTeacherUser=(req, res, next) => {
    User.find({usertype:'teacher'},{id:1,name:1,teacherCode:1,department:1,phone:1,image:1})
        .then(result => {
            res.json({ result })
        }).catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })
}

addAdmin=(req,res,next)=>{

    let newAdmin=new User({
        name:"Md Sohrab Hossain Sohel",
        institutename:"Rangpur Polytechnic Institute",
        gender:"male",
        usertype:"admin",
        email:"sohel@gmail.com",
        password:"244739",
        phone:"01740244739"
    })

    newAdmin.save()
        .then(result=>{
            res.json({
                message:"Admin Created Successfully",
                result
            })
        })
        .catch(error=>{
            res.json({
                message:"Server error Found"
            })
        })


}
loginStudent=(req,res,next)=>{
    let{roll,registration}=req.body

    Student.find({roll:`${roll}`})
        .then(result=>{
            if(result.length>0){
                    if(result[0].registration==registration){
                            let send={
                                name:result[0].name,
                                roll:result[0].roll,
                                registration:result[0].registration,
                                phone:result[0].phone,
                                group:result[0].groups,
                                shift:result[0].shifts,
                                department:result[0].department,
                                semester:result[0].semester,
                                image:result[0].image,
                                id:result[0]._id,
                                usertype:"student"

                            }

                        res.json({
                            message: "Login Successful",
                            result: "d",
                            send
                        })
                    }else{
                        res.json({
                            message: "Registration Doesn\'t Match",
                            result: "rg"
                        }) 
                    }
            }else{
                res.json({
                    message:"Roll Number Does not match",
                    result:"r"
                })
            }
        })
        .catch(error=>{
            res.json({
                message:"Error",
                error
            })
        })
}







module.exports={
    loginAdmin,
    registerTeacher,
    getAllTeacherUser,
    addAdmin,
    loginStudent
}