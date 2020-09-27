const router = require('express').Router()
const auth = require('../middleware/auth')
//Controller
const contactController = require('../controllers/contact')



//Get
router.get('/',auth,contactController.getAllContactController)

//Post
router.post('/',auth,contactController.postNewContactController)

//Single contact 
router.get('/:id',auth,contactController.getSingleContact)

//Delete contact
router.delete('/:id',auth,contactController.deleteContact)

//Update contact
router.put('/:id',auth,contactController.editContact)


module.exports = router