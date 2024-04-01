import express  from 'express'
import {connectDB} from './config/db.js'
import user from './models/form.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import transporter from './config/nodemailer.js'
dotenv.config()
connectDB()

const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/forminfo",async(req,res)=>{
const {email,name,mobileno,gender,residency}=req.body;
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
res.send(u);
});
app.listen(3000,()=>{
    console.log("listening");
})

