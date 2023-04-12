require('dotenv').config()
const eventModel = require('../models/eventModel')

exports.createEvent = async (req, res) => {
    try {
        const { name, description, price, stock, totalSell, images, discount , ratings , startdate , enddate} = req.body
        
        const event = new eventModel({ name, description, price, discount , stock, totalSell, images, ratings, user : req.user._id , startdate , enddate })
        await event.save()
        console.log('evngt three')
        res.status(201).send({success : true , event})

    } catch (error) {
        res.status(500).send({error})
    }
}

exports.getevent = async (req , res) => {
    try {
        
        const allevent = await eventModel.find()
        res.status(200).send({success : true , events : allevent})

    } catch (error) {
        res.status(500).send({error})
    }
}

exports.deleteEvent  = async (req , res) => {
    try {
        const { id } = req.query

        const event = await eventModel.findById(id)
        if(!event){
            res.staus(400).send({error : 'event not exist'})
        }

        const deletedevent = await eventModel.findByIdAndDelete(id) 
        res.status(200).send({success : true , deletedevent})

    } catch (error) {
        res.status(500).send({error})
    }
}

exports.sellercreateEvent = async (req , res) => {
    try {

        const sellerevent = await eventModel.find({id : req.user._id})

        res.status(200).send({success : true , events : sellerevent})

    } catch (error) {
        res.status(500).send({error})
    }
}