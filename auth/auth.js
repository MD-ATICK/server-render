require('dotenv').config()
const jwt = require('jsonwebtoken')
const users = require('../models/userModel')

exports.isAuthUser = (req, res, next) => {
    const token = req.app.locals.token
    console.log('1')
    console.log(token)
    console.log('2')
    if (token === null || token === undefined || !token) {
        return res.send({ isauthuser: false , error: 'token not found' })
    }
    console.log('2')
    try {
        jwt.verify(token, 'atickOnFire', async (err, verifiedJwt) => {
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
