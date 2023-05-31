require('dotenv').config()
const express = require('express')
const app=express()
const PORT=3500
const studentsRouter=require('./routes/students')

app.use(express.json())


const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.on('error',(errorMessage)=>console.log(errorMessage))
db.once('open',()=>console.log('connection established'))

app.get('/',(request,response)=>
{
    response.send(`WELCOME`)
})

app.use('/api/v1/students',studentsRouter)

app.listen(PORT,console.log(`Server runs at http://localhost:${PORT}`))