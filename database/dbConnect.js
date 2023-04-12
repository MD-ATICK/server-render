require('dotenv').config()
const mongoose = require('mongoose')

exports.DbConnect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Url)
        console.log('database Connected')
    } catch (error) {
        console.log(error.message)
    }
}