const express = require('express')
const { postdiscountCopoun, getallcopoun, deleteCopoun } = require('../controllers/CopuanControllers')
const { isAuthUser } = require('../auth/auth')
const { authorizeRoles } = require('../auth/roleAuth')
const router = express.Router()


router.post('/discountcopoun' , isAuthUser , authorizeRoles('seller' , 'admin') , postdiscountCopoun)
router.get('/discountcopounget' , isAuthUser , authorizeRoles('seller' , 'admin') , getallcopoun )
router.delete('/discountcopoundelete' , isAuthUser , authorizeRoles('seller' , 'admin') , deleteCopoun )

module.exports = router