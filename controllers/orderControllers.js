const orderModel = require('../models/OrderModel')
const productsModel = require('../models/productModel')

require('dotenv').config()


exports.orderCreate = async (req, res) => {

    try {
        console.log(req.body)
        const { cartitems, shippingdata, shippingtax, subtotal, promocode, promodiscount } = req.body
        // console.log('cartitems' + cartitems)

        const order = new orderModel({ orderItem: cartitems, orderShippingAddress: shippingdata, shippingtax, promocode, subtotal, promodiscount, user: req.user._id })
        await order.save()

        cartitems.map(async(i) => {
            const id = i._id
            console.log('id' + id)
            const update = await productsModel.findById(id)
            console.log('update' + update)
            update.totalSell += i.quantity;
            console.log('update' + update)
            await update.save()
        })

        res.status(201).send({
            success: true,
            order
        })

    } catch (error) {
        res.status(500).send(error)
    }

}

exports.userOrderGet = async (req, res) => {
    try {

        console.log('orders1')
        const user = req.user._id
        console.log('orders2' + user)
        const userorder = await orderModel.find({ user })
        res.status(200).send({ success: true, userorder })

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.asOrderGet = async (req, res) => {
    try {

        const allorders = await orderModel.find()

        res.status(200).send({ success: true, allorders })

    } catch (error) {
        res.status(500).send(error)
    }
}


exports.asOrderDelete = async (req, res) => {

    const { id } = req.query
    console.log(id + 'oi')
    const dltorder = await orderModel.findByIdAndDelete(id)
    res.status(200).send({ success: true, dltorder })

}