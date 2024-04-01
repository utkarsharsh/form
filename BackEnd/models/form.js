import mongoose  from 'mongoose'

const users = new mongoose.Schema({
    name:String,
    mobileno:String,
    gender:String,
    email:String,
    residency:String,
    domain:String,
},{
    timestamps:true
})
export default mongoose.model("user", users);