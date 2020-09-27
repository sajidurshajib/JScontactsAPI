const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')


//Register
const registerController = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            res.json({
                error:err
            })
        }
        //bcrypt done


        let user = new User({
            email: req.body.email,
            password: hash
        })

        user.save()
            .then(result=>{
                res.status(201).json({
                    message:"User created successfully",
                    user: result
                })
            })
            .catch(err=>{
                res.json({err})
            })
        
    })    
}


//Login
const loginController = (req, res, next)=>{
    let email = req.body.email
    let password = req.body.password

    User.findOne({email})
        .then(user=>{
            if(user){
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err){
                        res.json({message:"Error occured"})
                    }

                    if(result){
                        let token = jwt.sign({email: user.email, _id: user._id},'SECRET',{expiresIn:'2h'})

                        res.json({
                            message:"Login successful",
                            token
                        })
                    }
                    else{
                        res.json({message:"Login failed"})
                    }
                })
            }
            else{
                res.json({message:"User not found"})
            }
        })
}


//All user
const getAllUser = (req, res, next)=>{
    User.find()
        .then(users=>{
            res.json({
                users
            })
        })
        .catch(err=>{
            res.json({
                err
            })
        })
}

module.exports = {
    registerController,
    loginController,
    getAllUser
    
}