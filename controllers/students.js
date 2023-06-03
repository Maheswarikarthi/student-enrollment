const studentsModel=require('../models/students')
const getAllstudents = async(request,response)=>
{
    //response.send("List of all students")
    try{
            const students=await studentsModel.find();
            response.status(200).json(students);
        }
        catch(error){
            response.status(500).json({message:error.message})
        }
}
const createANewstudent =async(request,response)=>
{
    //response.send("creating a new todo")
    //response.json(request.body)
    const newstudent=new studentsModel({
                name:request.body.name ,
                enrolledDepartment:request.body.enrolledDepartment ,
                enrollmentDate:request.body.enrollmentDate
            })
            try{
                const student=await newstudent.save();
                response.status(201).json(student);
            }
            catch(error){
                response.status(500).json({message:error.message})
            }
}
const getAstudent =(getStudent,(request,response)=>{
        //response.send(`Updating student with id ${request.params.id}`);
        response.status(200).json(response.student)
    })

const updateAstudent =(getStudent,async(request,response)=>
{
    //response.send(`updating student with id ${request.params.id}`)
    if(request.body.name!=null)
    {
        response.student.name=request.body.name;
    }
    if(request.body.enrolledDepartment!=null)
    {
        response.student.enrolledDepartment=request.body.enrolledDepartment;
    }
    if(request.body.enrollmentDate!=null)
    {
        response.student.enrollmentDate=request.body.enrollmentDate;
    }
    try{
        const updatedStudent = await response.student.save();
        response.status(201).json(updatedStudent);
    }
    catch(error){
        response.status(401).json({message:error.message})
    }
    
})
const deleteAstudent=(getStudent,async(request,response)=>
{
    //response.send(`deleting student with id ${request.params.id}`)
    try{
                await response.student.deleteOne();
                response.json({message:`Deleted the user ${response.student.name}`})
            }
            catch(error){
                response.status(500).json({message:error.message})
            }
})
async function getStudent(request,response,next){
        let student
        try{
            student=await studentsModel.findById(request.params.id)
            if(student==null){
               return  response.status(404).json({message:`Cannot find user with id ${request.params.id}`})
    
            }
        }
        catch(error){
    return response.status(500).json({message:error.message})
        }
        response.student=student;
        next()
    }
module.exports={getStudent,getAllstudents,createANewstudent,getAstudent,updateAstudent,deleteAstudent}