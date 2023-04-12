require('dotenv').config()
const mongoose = require('mongoose')

exports.DbConnect = async () => {
    try {
        // await mongoose.connect(process.env.Mongo_Url)
        console.log('connect loading ...')
        await mongoose.connect('mongodb+srv://e-commerce-becodemy:e-commerce-becodemy@cluster0.sxaoekd.mongodb.net/e-commerce-becodemy?retryWrites=true&w=majority')
        console.log('database Connected')
    } catch (error) {
        console.log(error.message)
    }
}