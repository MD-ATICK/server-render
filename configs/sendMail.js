require('dotenv').config()
const nodemailer = require('nodemailer')

const sendMail = async (options) => {
    try {
        
        console.log(8)
        console.log(options)
        const transportar = nodemailer.createTransport({
            host : 'smtp.gmail.com' ,
            port : 465 ,
            auth : {
                user : 'sbgamercostom2@gmail.com' ,
                pass : 'ohvoyozsewwespok'
            }
        })
        console.log(9)
        console.log(options)
        
        const mailOptions = {
            from : 'smtp.gmail.com' ,
            to : options.email ,
            subject : options.subject ,
            text : options.message ,
        }
        console.log(10)
        
        await transportar.sendMail(mailOptions)
        console.log(11)
    } catch (error) {
        console.log(12)
        console.log({error})
    }
}

module.exports = sendMail;