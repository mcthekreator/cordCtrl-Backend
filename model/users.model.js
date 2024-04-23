const mongoose = require ('mongoose')

const userModel = mongoose.Schema(
    {
        id: {type:String, required:false},
        name: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true},
        address1: { type: String, require: true},
        address2: { type: String, require: true},
        region: { type: String, require: true},
        country: { type: String, require: true},
        verificationCode: { type: String, require: true},
        image: { type: String, require: false },
     },
    
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users', userModel)