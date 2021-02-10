const Answer=require("../controller/Schema/QuizAnswerSchema")
const Quize = require("./Schema/quizeSchema")
publishNewAnswer=(req,res,next)=>{
        let{roll,registration,mark,timeSpent}=req.body
        let id=req.params.id
        let newAnswer={
            roll,registration,mark,timeSpent
        }

    Answer.updateOne({ quizId: id }, { $push: { answers:newAnswer}})
        .then(result=>{
            res.json({
                message:"Your Result Is Published",
                result
            })
        }).catch(error=>{
            res.json({
                message:"Server Error",
                error
            })
        })


      






}

module.exports={
 publishNewAnswer   
}