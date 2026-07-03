const jwt = require("jsonwebtoken")
const userModel = require("../users/user.model.js")
const bcrypt = require("bcrypt")

exports.signUp = async ({fullName, age, email, password, birthDate}) => {
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return "ALREADY_EXISTS"
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await userModel.create({
        fullName,
        age,
        email,
        password: hashedPassword,
        birthDate
    })

    return "Done"
}

exports.signIn = async ({email, password}) => {
    const existingUser = await userModel.findOne({email}).select("+password")
    if(!existingUser){
        return "INVALID_CREDENTIALS"
    }

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password)

    if(!isCorrectPassword){
        return "INVALID_CREDENTIALS"
    }

    const payLoad = {
        userId: existingUser._id,
        role: existingUser.role
    }

    const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: "1h"})

    return accessToken
}

exports.currentUser = async (id) => {
    const existingUser = await userModel.findById(id)
    return existingUser
}