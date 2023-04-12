require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
    type : String ,
    required: [true, "Please enter your pic"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password  <--
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// jwt token  <--
// userSchema.methods.getJwtToken = () => {
//    const token = 
//    return token;
// };

const users = mongoose.model("users", userSchema)

module.exports = users