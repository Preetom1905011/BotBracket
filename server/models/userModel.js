const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function (userName, email, password) {
    
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email already Exists')
    }

    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({userName, email, password: hash})
    
    return user
}

module.exports = mongoose.model('User', userSchema)