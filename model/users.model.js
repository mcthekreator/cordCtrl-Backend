const mongoose = require ('mongoose')

const userModel = mongoose.Schema(
    {
        username: {type:String, require: true,},
        email: {type:String, require: true},
        password: {type: String, require: true},
        image: {type: String, rquire: false}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users', userModel)