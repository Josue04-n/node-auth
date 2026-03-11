import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    img:{
        type: String,
    },
    roles:{
        type: [String],
        default: ["User_Role"],
        enum: ["User_Role", "Admin_Role"]
    }

});

export const UserModel = mongoose.model('User',userSchema)