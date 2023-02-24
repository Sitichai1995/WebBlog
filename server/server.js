const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config()
const blogRoute = require('./route/blog');
const authroute = require('./route/auth');

const app = express()

//connect clound database
mongoose.connect(process.env.Database,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=> console.log("connect success"))
.catch((err)=> console.log(err))

//middleware ตั้งค่าว่าเว็บของเรามีความสามารถอะไรบ้าง
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
app.use("/api",blogRoute)
app.use("/api",authroute) //ใช้ /api แล้วใช้งาน authroute ให้สามารเรียกทำงาน /login ทำงาน

const port = process.env.port || 8080
app.listen(port,()=>console.log(`start server inport ${port}`))