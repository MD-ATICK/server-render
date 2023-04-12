require('dotenv').config()
const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    totalSell: {
        type : Number ,
        default : 0
    },
    ratings: {
        type :Number ,
        default : 0
    },
    images: Array,
    startdate : String ,
    enddate : String ,
    description: {
        type: String,
        default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nam obcaecati quo ab, repellat earum quasi illo est quia, accusamus asperiores excepturi dolores distinctio! Tempore ducimus perspiciatis quos libero quia ut architecto deserunt et aspernatur. Nihil vel eos perferendis name.'
    },
    discount: {
        type: Number,
        default: 500
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

const eventModel = mongoose.model('events', eventSchema)
module.exports = eventModel