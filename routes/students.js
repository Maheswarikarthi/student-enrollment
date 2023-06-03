const express=require('express')
const router=express.Router()
const {getStudent,getAllstudents, createANewstudent, getAstudent,updateAstudent,deleteAstudent}=require('../controllers/students')
router.route('/').get(getAllstudents).post(createANewstudent)
router.route('/:id').get(getStudent,getAstudent).patch(getStudent,updateAstudent).delete(getStudent,deleteAstudent)

module.exports=router