require('dotenv').config()
const jwt = require('jsonwebtoken')
const users = require('../models/userModel')

exports.isAuthUser = (req, res, next) => {
    const { token } = req.cookies
    console.log('1')
    console.log(token)
    console.log('2')
    if (!token) {
        return res.send({ isauthuser: false , error: 'Login now Then We Given UI' })
    }
    console.log('2')
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, verifiedJwt) => {
            if (err) {
                res.send({ isauthuser : false , error: err.message })
                console.log('3')
            } else {
                console.log('4')
                req.user = await users.findById(verifiedJwt.id)
                next()
            }
        })
    } catch (error) {
        console.log('5')
        res.status(500).send({isauthuser : false , error : error.message})
    }

}
