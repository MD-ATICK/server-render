require('dotenv').config()
const jwt = require('jsonwebtoken')
const users = require('../models/userModel')

exports.isAuthUser = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    console.log('1')
    if(token){
        console.log('2')
        // const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, 'atickOnFire', async (err, verifiedJwt) => {
                if (err) {
                    res.json({ isauthuser : false , error: err.message })
                    console.log('3')
                } else {
                    console.log('4')
                    req.user = await users.findById(verifiedJwt.id)
                    next()
                }
            })
        } catch (error) {
            console.log('5')
            res.status(500).json({isauthuser : false , error : error.message})
        }
    } else {
         res.json({ isauthuser: false , error: 'token not found' })
    }
}
