import mongoose from "mongoose";

const userModel = mongoose.Schema(
    {
        id: {type:String, required:false},
        username: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true},
        image: { type: String, require: false },
     },
    
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users', userModel)