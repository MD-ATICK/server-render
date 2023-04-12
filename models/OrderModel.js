const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    orderItem : Array ,
    orderShippingAddress : Object ,
    orderStatus : {
        type : String ,
        default : 'Processing'
    } ,
    orderPayment : {
        type : String ,
        default : 'Cash On Delivary'
    } ,
    discount : {
        type : Number ,
        default : 0
    } ,
    promocode : {
        type : String 
    } ,
    promodiscount : {
        type : Number ,
        default : 0
    } ,
    subtotal : {
        type : Number ,
        default : 0
    } ,
    shippingtax : {
        type : Number ,
        default : 0
    } ,
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : 'user' ,
        require : true
    }
})

const orderModel = mongoose.model('orders' , orderSchema)
module.exports = orderModel