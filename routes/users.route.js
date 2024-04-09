const router = require('express').Router()
const userController = require('../controllers/user.controller')


router.get('/users', userController.getAllUsers)
router.post('/users', userController.registerUser)




module.exports = router