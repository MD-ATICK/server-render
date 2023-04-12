require('dotenv').config()
const jwt = require('jsonwebtoken')
const sendMail = require('../configs/sendMail')
const sellers = require('../models/SellerModel')
const users = require('../models/userModel')





// --> Register Route Processed  <--
exports.SellerRegister = async (req, res) => {
    try {

        console.log(1)
        const { name, email, password, avatar, address, zipCode, phoneNumber } = req.body
        const userExist = await sellers.findOne({ email })

        if (!name || !email || !password || !avatar) {
            return res.status(422).send({ error: 'Invalid Shop Feild' })
        }

        if (userExist) {
            return res.status(422).send({ error: 'Shop Already Created By Other' })
        }
        console.log(2)

        console.log(req.body)
        const activationToken = createActivationToken({ name, email, password, avatar, address, zipCode, phoneNumber, user: req.user._id })
        console.log(3)
        req.app.locals.activationTokenvai = activationToken
        const activationUrl = `https://incredible-sunshine-6fbe95.netlify.app/activationshop/${activationToken}`
        console.log(activationUrl)

        try {
            console.log(4)
            // --> send mail <--
            sendMail({
                email: req.body.email,
                subject: 'Activation Your Account Now',
                message: `Hello ${req.body.name} , please click on the link to activate your account : ${activationUrl}`
            })
            console.log(5)

            res.status(201).send({
                success: true,
                message: `pleace your email:- ${req.body.email} to activate your Shop`
            })
            console.log(6)
        } catch (error) {
            console.log(7)
            res.status(500).send({ error })
        }

        // --> all last after varify by email then it run
        // const user = new users(req.body)
        // await user.save()


    } catch (error) {
        res.status(500).send({ error })
    }
}

const createActivationToken = (user) => {
    const ActivationToken = jwt.sign(user, process.env.ActivationToken, { expiresIn: '2m' })
    return ActivationToken;
}

exports.ActivationShop = (req, res) => {
    try {
        const { activationToken } = req.body

        console.log(activationToken)
        console.log(req.app.locals.activationTokenvai)

        console.log(12)
        if (req.app.locals.activationTokenvai != activationToken) {
            return res.status(400).send({ message: 'Ager token tor teke ami boro..!!' })
        }

        console.log(13)
        const user = jwt.verify(activationToken, process.env.ActivationToken)
        if (!user) {
            return res.status(400).send({ message: 'ki ar bolbo' })
        }

        jwt.verify(activationToken, process.env.ActivationToken, async (err, verifiedJwt) => {
            if (err) {
                console.log(14)
                res.status(400).send(err.message)
            } else {
                const user2 = await sellers.findOne({ email: verifiedJwt.email })
                console.log(15)
                if (user2) {
                    return res.status(400).send({ message: 'Shop already exist' })
                }

                const { name, email, password, avatar, address, zipCode, phoneNumber, user } = verifiedJwt

                const shop = new sellers({ name, email, password, avatar, address, zipCode, phoneNumber, user })
                await shop.save()

                console.log(16)
                req.app.locals.activationToken = null;
                res.status(201).send({
                    success: true,
                    shop,
                })
            }
        })
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.getAllseller = async (req, res) => {
    try {
        const sellershop = await sellers.find()
        res.status(200).send({ success: true, sellers: sellershop })
    } catch (error) {
        res.status(500).send({ error })
    }
}


exports.verifiedShop = async (req, res) => {
    const { id , email } = req.body
    try {
        const user = await users.findById(id)
        const shop = await sellers.findOne({user : id})
        if (!user) {
            return res.status(422).send({ message: 'Seller Verified Unsuccessfull' })
        }
        user.role = 'seller'
        shop.role = 'seller'
        user.save()
        shop.save()
        sendMail({
            email: email,
            subject: 'Shop Verified Successfully',
            message: `Hello ${user.name} , You Shop have Been Verifief by us. You have maintain some rules : 1 - be honest be carefull. 2 - behaviou will be smoot. 3 - fast services and fast delivery `
        })
        res.status(201).send({ success: true, user })
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.unverifiedShop = async (req, res) => {
    const { id , email } = req.body
    try {
        const user = await users.findById(id)
        const shop = await sellers.findOne({user : id})

        if (!user) {
            return res.status(422).send({ message: 'Seller unVerified Unsuccessfull' })
        }
        user.role = 'user'
        shop.role = 'user'
        user.save()
        shop.save()
        sendMail({
            email: email,
            subject: 'Shop Verified Successfully',
            message: `<style>div { color:red; }</style><div>Hello ${user.name}</div> , You Shop have Been disverified by us. You have some issuces and you also a scammer so we rejected you for seller.`
        })
        res.status(201).send({ success: true, user })
    } catch (error) {
        res.status(500).send({ error })
    }
}


exports.Shopfollow =  async (req, res) => {
    const {id} = req.params
    console.log('f1' + id)
    const seller = await sellers.findOne({user : id})
    
    const sellerexist = seller.followers.find((i) => i.id.toString() === req.user._id.toString())
    console.log('f2' + sellerexist)
    if(sellerexist){
        res.status(200).send({followed : true})
    } else {
        res.status(200).send({followed : false})
    }
}


exports.addfollow = async (req , res) => {
    const { id } = req.query

    const seller = await sellers.findOne({user : id})
    const follower = {
        id : req.user._id ,
        name : req.user.name
    }

    seller.followers.push(follower)
    seller.follow = seller.followers.length
    await seller.save()

    res.status(200).send({success : true , seller})

}

exports.deletefollow = async (req , res) => {
    const {id} = req.query
    const seller = await sellers.findOne({user : id})

    const user = req.user._id
    console.log(user)
    console.log(seller)
    const followersvai = seller.followers.filter((i) => i.id.toString() !== user.toString())
    console.log(followersvai)
    const follow = followersvai.length

    await sellers.findByIdAndUpdate(id , {
        followers : followersvai ,
        follow,
    } , { new: true, runValidators: true, useFindAndModify: false } , )

    res.status(200).send({followers : followersvai})

}