const express = require('express')
const { orderCreate, userOrderGet, asOrderGet, asOrderDelete } = require('../controllers/orderControllers')
const { isAuthUser } = require('../auth/auth')
const router = express.Router()


router.post('/order-create' , isAuthUser , orderCreate)
router.get('/user-order' , isAuthUser , userOrderGet)
router.get('/all-order' , isAuthUser  , asOrderGet)
router.delete('/order-delete' , isAuthUser , asOrderDelete)

module.exports = router