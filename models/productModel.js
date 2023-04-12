const mongoose = require('mongoose')


// category , name , description , images(array) , price , ratings , review(array) , stock , totalSell 


const productSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'must enter product name']
    },
    category: {
        type: String,
        // required: [true, 'must enter product category']
    },
    description: {
        type: String,
        // required: [true, 'must enter product descrioption']
    },
    price: {
        type: Number,
        // required: [true, 'must enter product price']
    },
    ratings: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    totalSell: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            avatar : {
                type: String,
                required: true
            } ,
            // aigula body te dite hobe  <--
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            images: Array 
        }
    ],
    numberofreviews : {
        type : Number ,
        default : 0
    } , 
    images: {
        type : Array
    },
    createTime : {
        type : String ,
        default : Date.now
    },
})

const productsModel = mongoose.model('products', productSchema)

module.exports = productsModel