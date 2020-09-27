const mongoose = require('mongoose')
const valid = require('validator')

const Schema = mongoose.Schema

const contactSchema =  new Schema({
    name:{
        type:String,
        trim: true,
        required:true
    },
    phone:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        validate: {
            validator:(v)=>{
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    }
})

const Contact = mongoose.model('Contact',contactSchema)
module.exports = Contact