const copounModel = require('../models/CopounModel')

require('dotenv').config()


exports.postdiscountCopoun = async (req, res) => {
    try {
        const { name, valuePercentage, minamount, maxamount } = req.body
        const user = req.user._id

        const finded = await copounModel.findOne({name})
        if(finded){
            return res.status(422).json({error : 'Provide Unique Name Each Copoun'})
        }
        
        const copoun = new copounModel({ name, valuePercentage, minamount, maxamount, user })
        await copoun.save()
        res.status(201).json({succes : true , copoun})
        
    } catch (error) {
        res.status(500).json({error})
    }
}

exports.getallcopoun  = async (req , res) => {
    
    try {
        console.log('reach reach reach')
        const copouns = await copounModel.find()
        console.log(copouns)
        res.status(200).json({
            success : true ,
            copouns
        })

    } catch (error) {
        res.status(500).json({error})
    }

}

exports.deleteCopoun = async (req , res) => {
    try {
        
        const { id } = req.query
        const copoun = await copounModel.findByIdAndDelete(id)
        res.status(200).json({success : true , copoun})

    } catch (error) {
        res.status(500).json({error})
    }
}