const mongoose = require('mongoose')
const valid = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        trime: true,
        validate: {
            validator: (v)=>{
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    password: String
})

const User = mongoose.model('User',userSchema)
module.exports = User