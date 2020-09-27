const Contact = require('../models/Contact')


//All
const getAllContactController = (req,res,next)=>{
    Contact.find()
        .then(data => {
            res.json({
                message: "All Contacts",
                data
            })
        })
        .catch(err =>{
            res.json({
                message: 'Error',
                contact: err
            })
        })
}


// Post single
const postNewContactController = (req,res,next)=>{
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    contact.save()
            .then(data => {
                res.json({
                    message: 'Contact added',
                    contact: data
                })
            })
            .catch(err =>{
                res.json({
                    message: 'Error',
                    contact: err
                })
            })
}

//Single
const getSingleContact = (req, res, next)=>{
    let id = req.params.id
    Contact.findById(id)
        .then(data => {
            res.json({
                message: 'Contact found',
                contact: data
            })
        })
        .catch(err =>{
            res.json({
                message: 'Error',
                contact: err
            })
        })
}

//Delete
const deleteContact = (req, res, next)=>{
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(data => {
            res.json({
                message: 'Contact delete',
                contact: data
            })
        })
        .catch(err =>{
            res.json({
                message: 'Error',
                contact: err
            })
        })
}

//Update
const editContact = (req, res, next)=>{
    let id = req.params.id
    let updateContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, {$set: updateContact})
        .then(contact => {
            Contact.findById(contact._id)
                .then(newContact => {
                    res.json({
                        message: 'Contact update',
                        newContact
                    })
                })
        })
        .catch(err =>{
            res.json({
                message: 'Error',
                contact: err
            })
        })
}


module.exports ={
    getAllContactController,
    postNewContactController,
    getSingleContact,
    deleteContact,
    editContact
}