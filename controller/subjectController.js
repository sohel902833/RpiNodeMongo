var Subject=require("./Schema/SubjectSchema")

addNewSubject=(req,res,next)=>{
    let{name,code,department,semester}=req.body

    let newSubject = new Subject({ name, code,department,semester })

    Subject.find({code:`${code}`,department:`${department}`,semester:`${semester}`})
        .then(matchresult=>{
            if(matchresult.length>0){
                res.json({
                    r: "c",
                    message: "Subject Exists"
                })
            }else{
                newSubject.save()
                    .then(result => {
                        res.json({
                            message: "Subject Added",
                            r: "d",
                            result
                        })
                    }).catch(error => {

                        res.json({
                            message: "Server Error Found",
                            error
                        })
                    })
            }
        }).catch(error => {

            res.json({
                message: "Server Error Found",
                error
            })
        })
}



deleteSubject = (req, res, next) => {

    let id = req.params.id

    Subject.findOneAndDelete({ _id: id })
        .then(result => {
            res.json({
                message: "Delete Successfull",
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

getAllSubject=(req,res,next)=>{
      Subject.find()
        .then(result=>{
            res.json({
                result
            })
        })  .catch(error=>{
            res.json({
                message:"Server Error Found"
            })
        })
}

getSpecificSubject=(req,res,next)=>{
    let {department,semester}=req.params
     Subject.find({department:`${department}`,semester:`${semester}`})
        .then(result=>{
            res.json({
                result
            })
        })  .catch(error=>{
            res.json({
                message:"Server Error Found"
            })
        })
}
getSubjectCode=(req,res,next)=>{
    let {department,semester}=req.params
     Subject.find({department:`${department}`,semester:`${semester}`},{code:1,name:1})
        .then(result=>{
            res.json({
                result
            })
        })  .catch(error=>{
            res.json({
                message:"Server Error Found"
            })
        })
}

// updatePresent = (req, res, next) => {

//     let id = req.params.id

//     Present.findOneAndDelete({ _id: id })
//         .then(result => {
//             res.json({
//                 message: "Deleted Successfull"
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: "Server Error",
//                 error
//             })
//         })
// }







module.exports={
    addNewSubject,
    deleteSubject,
    getAllSubject,
    getSpecificSubject,
    getSubjectCode
}