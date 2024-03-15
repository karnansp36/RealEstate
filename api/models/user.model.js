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
     
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3641/3641963.png"
    },
}, {timestamps: true});  //this will add createdAt and updatedAt to the schema

const User = mongoose.model('users', userSchema);


export default User;