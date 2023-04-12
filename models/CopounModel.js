const mongoose = require('mongoose')

const CopounSchema = mongoose.Schema({
    name : {
        type : String ,
        require : true ,
        unique : [true , 'provide unique name']
    } ,
    valuePercentage : Number ,
    minamount : Number ,
    maxamount : Number ,
    use : {
        type : String ,
        default : false
    } ,
    user : { 
        type : mongoose.Schema.ObjectId ,
        ref : 'user' ,
        require : true
    }
})


const copounModel = mongoose.model('copouns' , CopounSchema)
module.exports = copounModel