const Routine = require("./Schema/RoutineSchema")

saveNewRoutine=(req,res,next)=>{
    let { startTime, endTime, day, teacherName, roomNumber, teacherCode, department, group, shift, semester, period, subjectCode, serial } = req.body


    Routine.find({startTime:`${startTime}`,endTime:`${endTime}`,department:`${department}`,semester:`${semester}`,groups:`${group}`,shift:`${shift}`,serial:`${serial}`,day:`${day}`})
                .then(matchingresult=>{
                    if(matchingresult.length>0){
                        res.json({
                            r:"c",
                            message: "Already Exists",
                            result
                        })
                    }else{
                        let newRoutine = new Routine({
                            startTime, endTime, day, teacherName, roomNumber, teacherCode, department, groups: group, shift, semester, period, subjectCode, serial
                        })
                        newRoutine.save()
                            .then(result => {
                                res.json({
                                    r:"d",
                                    message: "Data Insert Successfull",
                                    result
                                })
                            })
                            .catch(error => {
                                +
                                res.json({
                                    message: "Server Error",
                                    error
                                })
                            }) 
                    }

                }).catch(error => {
                    +
                    res.json({
                        message: "Server Error",
                        error
                    })
                })   
}

getClassRoutine = (req, res, next) => {
    let { group, shift, department, semester } = req.params
    Routine.find({ groups: `${group}`, shift: `${shift}`, department: `${department}`, semester:`${semester}`})
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


getTeacherDayRoutine=(req,res,next)=>{
    let { day, code } = req.params

    Routine.find({day:`${day}`,teacherCode:`${code}`})
        .then(routine=>{
            res.json({
                routine
            })
        })
        .catch(error=>{
            res.json({
                message: "Server Error Found"
            })
        })




}
module.exports={
    saveNewRoutine,
    getClassRoutine,
    getTeacherDayRoutine
}