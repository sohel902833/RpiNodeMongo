
const Present=require("./Schema/PresentSchema")
const Student = require("./Schema/StudentSchema")

addnewPresent=(req,res,next)=>{
    let {presence,day,date,time,department,group,shift,semester,name,roll,registration,subjectName,subjectCode,teacherCode}=req.body
    
    let newPresent=new Present({
        presence,
        day,
        date,
        time,
        department,
        group,
        shift,
        semester,
        name,
        roll,
        registration,
        subjectName,
        subjectCode,
        teacherCode
    })
    newPresent.save()
        .then(result=>{
            res.json({
                message:`${roll} is ${presence}`,
                result
            })
        })
     .catch(error=>{
                res.json({
                    message:"Server Error Found",
                    error
             })
     })
}

deletePresent=(req,res,next)=>{

    let id=req.params.id

    Present.findOneAndDelete({_id:id})
        .then(result=>{
            res.json({
                message:"Delete Successfull",
                result
            })
        })
        .catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })


}

updatePresent=(req,res,next)=>{

    let id = req.params.id

    Present.findOneAndDelete({ _id: id })
        .then(result => {
            res.json({
                message: "Deleted Successfull"
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })
}

getAllPresent=(req,res,next)=>{
    Present.find()
        .then(result=>{
            res.json({result})
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}

getStudentPresentPercent=(req,res,next)=>{
        let{department,group,shift,semester,subjectCode,teacherCode}=req.params
        let find={
            department,group,shift,semester,subjectCode,teacherCode
        }  
 

        let pPersentege=[];

    Present.find(find, { roll: 1, presence:1})
        .then(result=>{
            for(var i=0; i<result.length; i++){
                pPersentege.push(result[i])
                let sfind = {
                    department, group, shift, semester,roll:result[i].roll
                }
                Student.findOne(sfind,{name:1})
                    .then(name=>{
                        console.log(name)
                        pPersentege[i].name="Sohel"
                        console.log(pPersentege)
                    }).catch(error => {
                        res.json({
                            message: "Server Error Found",
                            error
                        })
                    })
            }
            res.json({pPersentege})
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}

getStudentPresent=(req,res,next)=>{

    let{department,group,shift,semester,roll,registration,subjectCode,teacherCode}=req.params 

    let send = { department, group, shift, semester,roll,registration }



    Present.find({ department: `${department}`, group: `${group}`, shift: `${shift}`, semester: `${semester}`,roll:`${roll}`,registration:`${registration}`,subjectCode:`${subjectCode}`,teacherCode:`${teacherCode}` })
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

module.exports={
    addnewPresent,
    deletePresent,
    updatePresent,
    getAllPresent,
    getStudentPresent,
    getStudentPresentPercent
}