const express = require('express')
const { isAuthUser } = require('../auth/auth')
const { authorizeRoles } = require('../auth/roleAuth')
const { productCreate, adminProducts, sellerProducts, selleradminproductUpdate, productDelete, singleProduct, shopget, productreview, getAllreviews, deleteReviews, getsingleReview } = require('../controllers/productsController')
const router = express.Router()


router.get('/products/:id' , singleProduct)
router.get('/adminproducts' , adminProducts)
router.get('/sellerproducts' , isAuthUser , authorizeRoles('seller') , sellerProducts)

router.post('/productCreate' , isAuthUser , authorizeRoles('seller') , productCreate)
router.post('/review' , isAuthUser , productreview)
router.get('/review' , isAuthUser , getAllreviews)
router.delete('/review' , isAuthUser , deleteReviews)

router.put('/adminproducts' , isAuthUser , authorizeRoles('seller' , 'admin') , selleradminproductUpdate)

router.delete('/adminproducts' , isAuthUser , authorizeRoles('seller' , 'admin') , productDelete)

router.get('/' , (req , res) => {
    res.status(200).send({success : true , message : 'hello world ? who are you'})
})

module.exports = router