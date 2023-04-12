require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
        required: [true, "Please enter your pic"],
    },
    zipCode: {
        type: Number,
        require: [true, 'required failed']
    },
    phoneNumber: {
        type: String,
        require: [true, 'required failed']
    },
    description : {
        type : String ,
        default : 'Be honest Be Carefull'
    } ,
    follow : {
        type : Number ,
        default : 0
    } ,
    followers : Array ,
    user : {
        type : mongoose.Schema.ObjectId ,
    } ,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});

// Hash password  <--
sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


const sellers = mongoose.model("sellers", sellerSchema)

module.exports = sellers