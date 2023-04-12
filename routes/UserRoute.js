const express = require('express')
const { isAuthUser } = require('../auth/auth')
const { userRegister, Activation, LoginRoute, GetUser, logout } = require('../controllers/userController')
const router = express.Router()

router.get('/', (req ,res) => {
    res.send({msg : 'working fine..!!'})
})
router.post('/register' , userRegister)
router.post('/activation' , Activation)
router.post('/login' , LoginRoute)
router.get('/getuser' , isAuthUser , GetUser)
router.get('/logout' , isAuthUser , logout)


module.exports = router