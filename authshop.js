require('dotenv').config()
const jwt = require('jsonwebtoken')
const sellers = require('./models/SellerModel')

exports.isAuthShop = (req, res, next) => {
    const { shoptoken } = req.cookies
    console.log('1')
    if (!shoptoken) {
        return res.send({ isauthseller: false , error: 'Login now Then We Given Seller' })
    }
    console.log('2')
    try {
        jwt.verify(shoptoken, process.env.JWT_SECRET_KEY, async (err, verifiedJwt) => {
            if (err) {
                res.send({ isauthseller : false , error: err.message })
                console.log('3')
            } else {
                console.log('4')
                req.user = await sellers.findById(verifiedJwt.id)
                next()
            }
        })
    } catch (error) {
        console.log('5')
        res.status(500).send({isauthshop : false , error : error.message})
    }

}
