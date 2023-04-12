const express = require('express')
const { isAuthUser } = require('../auth/auth')
const { isAuthShop } = require('../authshop')
const { SellerRegister, ActivationShop, getAllseller, verifiedShop, unverifiedShop, Shopfollow, addfollow , deletefollow } = require('../controllers/ShopController')
const { shopget } = require('../controllers/productsController')
const router = express.Router()

router.get('/shop/:id' , shopget)
router.post('/register' , isAuthUser , SellerRegister )
router.post('/activationshop' , ActivationShop)
router.get('/getsellers'  , getAllseller) // role admin dile hobe 
router.post('/verifiedshop' , verifiedShop )
router.post('/disverifiedshop' , unverifiedShop )
router.get('/followck/:id' , isAuthUser , Shopfollow )
router.get('/addfollow' , isAuthUser , addfollow )
router.get('/deletefollow' , isAuthUser , deletefollow )

module.exports = router