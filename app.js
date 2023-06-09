require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()
// const port = process.env.Port
const port = 9898
const { DbConnect } = require('./database/dbConnect')
const user = require('./routes/UserRoute.js')
const shop = require('./routes/ShopRoute.js')
const product = require('./routes/ProductsRoute.js')
const order = require('./routes/OrderRoute.js')
const event = require('./routes/EventRoute')
const discountevent = require('./routes/CopounRoute.js')
const cloudinary = require('cloudinary')
const products = require('./models/productModel')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);


// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.cloud_secret_key,
// })

cloudinary.config({
    cloud_name: 'dplbrchw3',
    api_key: 646354854429973 ,
    api_secret: 'hgFyxzSXMHbQC4xYIy3dpFBKB90' ,
})


app.use(cors({
    origin : 'https://gleeful-otter-2f3bc2.netlify.app' ,
    credentials : true
}))
// app.use(cors({
//     origin : 'http://localhost:3000' ,
//     credentials : true
// }))

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v2/user', user)
app.use('/api/v2/shop', shop)
app.use('/api/v2/products', product)
app.use('/api/v2/orders', order)
app.use('/api/v2/events', event)
app.use('/api/v2/copoun', discountevent)


app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`)
    DbConnect()
}) 