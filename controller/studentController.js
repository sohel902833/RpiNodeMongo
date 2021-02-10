const { find } = require("./Schema/StudentSchema")
const Student = require("./Schema/StudentSchema")
const Quiz = require("./Schema/quizeSchema")
const QAnswer = require("./Schema/QuizAnswerSchema")




saveNewStudent=(req,res,next)=>{

    let { name, roll, registration, group, shift, department, image, semester, phone } = req.body

    const newStudent=new Student({
        name,
        roll,
        registration,
        groups:group,
        shifts:shift,
        department,
        image,
        semester,
        phone
    })

    newStudent.save()
        .then(result=>{
            res.json({
                message: "Student Added Successfull",
                result
            })
        }).catch(error=>{

            if (error.keyValue.roll){
                res.json({
                    message: "Roll Number Exists"
                }) 
            } else if (error.keyValue.registration){
                res.json({
                    message: "Registration  Exists"
                }) 
            }else{
               res.json({
                message: "Server Error"
            }) 
            }
            
        })
}

updateStudent=(req,res,next)=>{

    let id = req.params.id
    let { name, roll, registration, group, shift, department, image, semester, phone } = req.body
    const newStudent = new Student({
        name,
        roll,
        registration,
        groups: group,
        shifts: shift,
        department,
        image,
        semester,
        phone
    })


    Student.findOneAndUpdate({_id:id},{$set:{name,roll,registration,groups:group,shifts:shift,department,image,semester,phone}},{new:true})
        .then(result=>{
            res.json({
                message: "Student Update Successful",
                result
            })
        })
        .catch(error=>{
            res.json({
                message: "Server Error",
                error
            })
        })


}
changeStudentsSemester=(req,res,next)=>{

  let {group, shift, department,semester} = req.params
let upSemester=req.body.upSemester
  let findqueue={
      groups:`${group}`,
      shifts:`${shift}`,
      department:`${department}`,
      semester:`${semester}`
  }

  Student.updateMany(findqueue,{$set:{semester:`${upSemester}`}},{new:true})
    .then(result=>{
            res.json({
                message:"Semester Change Successful",
                result
            })
    }).catch(error=>{
        res.json({
            error
        })
    })
}




deleteStudent=(req,res,next)=>{
    let id = req.params.id
    console.log(id)
    Student.findOneAndDelete({_id:id})
        .then(result=>{
            res.json({
                message:"Student Deleted Successfull"
            })
        })
        .catch(error=>{
            res.json({
                message:"Server Error",
                error
            })
        })


}

getAllStudent=(req,res,next)=>{

    Student.find()
        .then(result=>{
            res.json({
                result
            })
        })
        .catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            })
        })

}

getsingleStudent=(req,res,next)=>{

    let { roll, reg } = req.params

    Student.find({roll:`${roll}`,registration:`${reg}`})
        .then(result=>{
            res.json({
                result
            })
        })
        .catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            })
        })

}

getAllDepartmentStudent=(req,res,next)=>{
    let department = req.params.department
    Student.find({department:`${department}`})
        .then(result => {
            res.json({
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })


}
getClassStudent=(req,res,next)=>{
    let { group, shift, department, semester } = req.params
    Student.find({ department: `${department}`,groups: `${group}`,shifts: `${shift}`,semester: `${semester}` })
        .then(result => {
            res.json({
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })
}


setQuiz=(req,res,next)=>{
    let { group, shift, department, semester, subjectCode} = req.params
    let{qId,qStatus,image,quizName,totalQuestion,time,endTime}=req.body

    console.log("Called");

    const newAnswerList=new QAnswer({
        quizId:qId,
        department,
        group,
        shift,
        semester,
        subjectCode
    })

    let findqueue = {
        groups: `${group}`,
        shifts: `${shift}`,
        department: `${department}`,
        semester: `${semester}`
    }

    let quizs={
        quizId:qId,
        quizStatus:qStatus,
        image, quizName, totalQuestion, time, endTime, subjectCode
     }

    newAnswerList.save()
        .then(sate=>{
            Student.updateMany(findqueue, { $push: { quizes: quizs } })
                .then(result => {
                    res.json({
                        message: "Quiz Published"
                    })

                }).catch(error => {
                    res.json({
                        error
                    })
                })

        }).catch(err=>{
            res.json({
                err
            })
        })
}



getSingleQuiz=(req,res,next)=>{
  let roll=req.params.roll
    let result=[]

    Student.find({roll:`${roll}`},{quizes:1})
        .then(quizes=>{
            quizes[0].quizes.forEach(quiz => {
                    let data={
                        _id: quiz._id, 
                        quizId: quiz.quizId,
                        quizStatus: quiz.quizName,
                        image: quiz.image,
                        quizName: quiz.quizName,
                        totalQuestion: quiz.totalQuestion,
                        time:quiz.time,
                        endTime:quiz.endTime
                            }
                        result.push(data)
                    })
            res.json({ result })
        }).catch(error=>{
            res.json({
                message:"Server Error",
                error
            })
        })
}



getQuiz=(req,res,next)=>{
    let { group, shift, department, semester, subjectCode } = req.params
  
    let findqueue = {
        group: `${group}`,
        shift: `${shift}`,
        department: `${department}`,
        semester: `${semester}`,
        subjectCode: `${subjectCode}`
    }
    QAnswer.find(findqueue,{quizId:1})
        .then(squiz=>{
            let result = getQuizName(squiz)
            console.log(result)
            res.json(result)

                  
         
       }).catch(error=>{
            res.json({
                message:"Server Error",
                error
            })
        })
}

module.exports={
    saveNewStudent,
    updateStudent,
    deleteStudent,
    getAllStudent,
    getsingleStudent,
    getAllDepartmentStudent,
    getClassStudent,
    changeStudentsSemester,
    setQuiz,
    getQuiz,
    getSingleQuiz
}