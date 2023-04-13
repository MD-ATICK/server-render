require('dotenv').config()
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sendMail = require('../configs/sendMail')
const sendToken = require('../configs/jwtToken')
const bcrypt = require('bcrypt')



// --> Register Route Processed  <--
exports.userRegister = async (req, res) => {
  try {

    console.log(1)
    const { name, email, password, avatar } = req.body
    const userExist = await users.findOne({ email })
    
    if (!name || !email || !password || !avatar) {
      return res.status(422).send({ error: 'Invalid Register Feild' })
    }
    
    if (userExist) {
      return res.status(422).send({ error: 'User Already Created By Other' })
    }
    console.log(2)
    
    console.log(req.body)
    const activationToken = createActivationToken(req.body)
    console.log(3)
    req.app.locals.activationToken = activationToken
    const activationUrl = `https://incredible-sunshine-6fbe95.netlify.app/activation/${activationToken}`
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
        message: `pleace your email:- ${req.body.email} to activate your account`
      })
      console.log(6)
    } catch (error) {
      console.log(7)
      res.status(500).send({error})
    }

    // --> all last after varify by email then it run
    // const user = new users(req.body)
    // await user.save()


  } catch (error) {
    res.status(500).send({error})
  }
}

const createActivationToken = (user) => {
  const ActivationToken = jwt.sign(user, 'learningWithAtick' , { expiresIn: '2m' })
  return ActivationToken;
}

exports.Activation = (req, res) => {
  try {
    const { activationToken } = req.body

    console.log(activationToken)
    console.log(req.app.locals.activationToken)
    
    console.log(12)
    if (req.app.locals.activationToken != activationToken) {
      return res.status(400).send({ message: 'Ager token tor teke ami boro..!!' })
    }
    
    console.log(13)
    const user = jwt.verify(activationToken, 'learningWithAtick')
    if (!user) {
      return res.status(400).send({ message: 'ki ar bolbo' })
    }
    
    jwt.verify(activationToken, 'learningWithAtick', async (err, verifiedJwt) => {
      if (err) {
        console.log(14)
        res.status(400).send(err.message)
      } else {
        const user2 = await users.findOne({ email: verifiedJwt.email })
        console.log(15)
        if (user2) {
          return res.status(400).send({ message: 'User create token diye ki hobe' })
        }
        
        const { name, email, password, avatar } = verifiedJwt
        
        const user = new users({ name, email, password, avatar })
        await user.save()
        
        console.log(16)
        // res.status(201).send({ success: true })
        req.app.locals.activationToken = null;
        res.status(201).send({
          success: true,
          user,
        })
      }
    })
  } catch (error) {
    res.status(500).send({ error })
  }
}


// ---> Login Route Processed <---
exports.LoginRoute = async (req, res) => {

  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Full Fill the Input Feild' })
    }
    const user = await users.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'This user not exist' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Provide Correct password' })
    }
    console.log(user)
    console.log(user._id)
    const token = jwt.sign( {id : user._id} , 'atickOnFire' , { expiresIn: '7d' })
    console.log(token)
    const options = {
        expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ,
        httpOnly : true ,
    }
    // req.app.locals.token = token ;
    res.status(201).cookie('token' , token , options).json({
        success : true ,
        user ,
        token ,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}



// Load user or get user  <--
exports.GetUser = async (req, res) => {
  try {
    console.log('7')
    const user = await users.findById(req.user._id)

    if(!user){
      return res.status(400).send({message : 'User not Exist'})
    }
    console.log('8')

    res.status(200).send({
      isauthuser : true ,
      success: true,
      user ,
    })
    console.log('9')

  } catch (error) {
    console.log('10')
    res.status(500).send({ error : error.message })
  }
}

exports.logout = async (req , res) => {
  try {
    console.log(req.user)
    req.app.locals.token = null ;
    res.cookie('token' , null , {httpOnly : true , expires : new Date(Date.now())}).status(200).send({message : 'logout succesfully'})
  } catch (error) {
    res.status(500).send(error)
  }
}