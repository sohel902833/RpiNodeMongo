
const Quiz=require("./Schema/quizeSchema")


addnewQuize=(req,res,next)=>{

    let { quizName,access,teacherId,image}=req.body
    let newQuize=new Quiz({
        quizName,
        access,
        teacherId,
        image
    })

    newQuize.save()
        .then(result=>{
            res.json({
                message:"New Quiz Created",
                result
            })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error})
        })
}


addNewQuestion=(req,res,next)=>{
    let id =req.params.id

    let { question, option1, option2, option3, option4, answerNr,mark}=req.body
   let data={
        question,option1,option2,option3,option4,answerNr,mark
    }
    Quiz.findOneAndUpdate({_id:`${id}`},{$push:{questions:data}})
              .then(result=>{
                    res.json({
                        message:"New Question Added Successful",
                        result
                    })
                }).catch(error=>{
                    res.json({
                        message:"Server Error Found",
                        error
                    })
                })
}
updateQuestion=(req,res,next)=>{
    let id =req.params.id
    let qid =req.params.qid
    let{question,option1,option2,option3,option4,answerNr,mark}=req.body
    Quiz.update({_id:id, 'questions._id': qid }, {
        '$set': {
            'questions.$.question': question,
            'questions.$.option1': option1,
            'questions.$.option1': option1,
            'questions.$.option2': option2,
            'questions.$.option3': option3,
            'questions.$.option4': option4,
            'questions.$.answerNr': answerNr,
            'questions.$.mark': mark
        }
    }).then(result=>{
                res.json({
                        message:"Update Successful",
                        result
                    })
    }).catch(error=>{
                    res.json({
                        message:"Server Error Found",
                        error
                    })
                })
}
getQuizQuestion=(req,res,next)=>{
    let id=req.params.id
    Quiz.find({_id:`${id}`})
        .then(result=>{
            res.json({
               result:result[0].questions
            })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}
deleteQuestion=(req,res,next)=>{
    let id = req.params.id
    let qid = req.params.qid
    Quiz.updateOne({ _id: id }, { $pull: { "questions": { _id: qid} } }, { safe: true, upsert: true })
        .then(result=>{
            res.json({
                message:"Question Deleted",
                result
            })
        }).catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            }) 
        })
}

getTeacherQuizes=(req,res,next)=>{
    let id = req.params.id
    let result=[]

    Quiz.find({ teacherId: `${id}` },{quizName:1,image:1,access:1,questions:1})
        .then(quizes => {
   

         quizes.forEach((data)=>{
              let quiz = {
                  _id:data._id,
                  quizName: data.quizName,
                  image: data.image,
                  access: data.access,
                  numberofquestions: data.questions.length
              } 
              result.push(quiz)
          })
           
          
          
            res.json({
                result
            })
        }).catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })  


}

updateQuiz=(req,res,next)=>{
    let id=req.params.quizId
     let { quizName, access} = req.body

    Quiz.findOneAndUpdate({ _id: `${id}` }, { $set: { quizName, access} }, { new: true })
        .then(result => {
            res.json({
                message: "Quiz Update Successful",
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })




}
updateImage=(req,res,next)=>{
    let id=req.params.id
     let { image} = req.body

    Quiz.findOneAndUpdate({ _id: `${id}` }, { $set: { image} }, { new: true })
        .then(result => {
            res.json({
                message: "Image Upload Successful",
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })




}

deleteQuiz=(req,res,next)=>{
    let id = req.params.id
    Quiz.findOneAndDelete({ _id: id })
        .then(result => {
            res.json({
                message: "Quiz Deleted Successfull"
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })
}

module.exports={
    addnewQuize,
    getTeacherQuizes,
    addNewQuestion,
    getQuizQuestion,
    updateQuiz,
    deleteQuiz,
    updateImage,
    updateQuestion,
    deleteQuestion
}