const express=require('express');
const router=express.Router();
const studentModel=require('../models/students');
router.get('/',async(request,response)=>{
    try{
        const students=await studentModel.find();
        response.status(200).json(students);
    }
    catch(error){
        console.log(error);
        response.status(500).json({message:error.message});
    }
       
})
router.post('/',async(request,response)=>{
   const newStudent= new studentModel({
    name: request.body.name,
    enrolledDepartment:request.body.enrolledDepartment,
    enrollmentDate:request.body.enrollmentDate
   })
   try{
    const student = await newStudent.save();
    response.status(201).json(student);
   }
   catch(error){
    console.log(error);
    response.status(500).json({message:error.message});
}
})
router.get('/:id',getStudent,async(request,response)=>{
    response.status(200).json(response.student);
})

router.patch('/:id',getStudent,async(request,response)=>{
    if(request.body.name!=null){
        response.student.name=request.body.name;
    }
    if(request.body.enrolledDepartment!=null){
        response.student.enrolledDepartment=request.body.enrolledDepartment;
    }
    try{
        const updatedStudent=await response.student.save();
        response.status(200).json(updatedStudent)
    }
    catch(error)
    {
        response.status.send(401).json({message:error.message})
    }

    
})
router.delete('/:id',getStudent,async(request,response)=>{
    try{
        await response.student.deleteOne();
        response.json({message:`Deleted user ${response.student.name}`})

    }
    catch(error){
        response.status(500).json({message:error.message})

    }
    
})
async function getStudent(request,response,next){
    let student
    try{
        student=await studentModel.findById(request.params.id)
        if(student==null){
           return response.status(404).json({message:`cannot find user with id ${request.params.id}`})
        }
}
    catch(error){
        return response.status(500).json({message:error.message})
    }
    response.student=student;
    next();
}

module.exports=router;
