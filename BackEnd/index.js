import express  from 'express'
import {connectDB} from './config/db.js'
import user from './models/form.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import transporter from './config/nodemailer.js'
import xlsx  from 'xlsx';
import fs from 'fs'
import path from 'path'
dotenv.config()
connectDB()
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.post("/api/forminfo",async(req,res)=>{
const {email,name,mobileno,gender,residency}=req.body;
console.log(req.body);
     const users= new user({
        email,name,mobileno,gender,residency
     });

     await users.save();
     await transporter.sendMail({
        from: "harshupadhyay7786@gmail.com", 
        to: email, 
        subject: "testing", 
        text: "Hello,Your registration is succesfull", 
        html: "", 
      }).then((e)=>{
        console.log("all done");
      }).catch((e)=>{
      console.log(e);
      });


     res.send("You are registered");
});


app.get("/api/data",async (req,res)=>{
let u= await user.find().sort({updated:-1});
let ub=JSON.stringify(u);
ub =JSON.parse(ub);

const wb=  xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(ub);
 xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
await xlsx.writeFile(wb, 'townhall.xlsx');
const file=path.join(__dirname, 'townhall.xlsx')
res.sendFile(file);
});
app.listen(3000,()=>{
    console.log("listening");
})

