import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
     
    }
}, {timestamps: true});  //this will add createdAt and updatedAt to the schema

const User = mongoose.model('UserData', userSchema);


export default User;