const router = require('express').Router()
const auth = require('../middleware/auth')
//Controller
const userController = require('../controllers/user')


//Login
router.post('/login',userController.loginController)
//Register
router.post('/register',userController.registerController)
//All users
router.get('/',auth ,userController.getAllUser)


module.exports = router