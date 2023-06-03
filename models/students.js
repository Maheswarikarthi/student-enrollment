// 

const mongoose=require('mongoose');
const studentsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    enrolledDepartment:{
        type:String,
        required:true
    },
    enrollmentDate:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('studentsModel',studentsSchema)