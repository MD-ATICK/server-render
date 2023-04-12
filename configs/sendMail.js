require('dotenv').config()
const nodemailer = require('nodemailer')

const sendMail = async (options) => {
    try {
        
        console.log(8)
        console.log(options)
        const transportar = nodemailer.createTransport({
            host : process.env.SMPT_HOST ,
            port : process.env.SMPT_PORT ,
            // service : process.env.SMPT_SERVICES ,
            auth : {
                user : process.env.SMPT_MAIL ,
                pass : process.env.SMPT_PASSWORD
            }
        })
        console.log(9)
        
        const mailOptions = {
            from : process.env.SMPT_MAIL ,
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