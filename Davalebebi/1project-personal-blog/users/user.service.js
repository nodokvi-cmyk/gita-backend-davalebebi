const blogModel = require("../blogs/blog.model.js")
const commentModel = require("../comments/comment.model.js")
const { uploadFile, deleteFile } = require("../lib/cloudinary.lib.js")
const userModel = require("./user.model.js")
const bcrypt = require("bcrypt")
require("dotenv").config()

exports.getAllUsers = async (query) => {
    const filter = {}
    if ("ageFrom" in query){
        filter["age"] = {
            ...filter["age"],
            "$gte": Number(query.ageFrom)
        }
    }
    if ("ageTo" in query){
        filter["age"] = {
            ...filter["age"],
            "$lte": Number(query.ageTo)
        }
    }
    if("fullName" in query){
        filter["fullName"] = { 
        $regex: `^${query.fullName.toLowerCase()}`, 
        $options: "i" 
    }
}
    const users = await userModel.find(filter).populate("blogs", "title")
    return users
}

exports.getUserById = async (id) => {
    const user = await userModel.findById(id).populate("blogs", "title")
    if(!user){
        return null
    }
    return user
}

exports.deleteUserById = async (id) => {
    const deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser){
        return null
    }

    if(deletedUser.profileAvatar && deletedUser.profileAvatar.imagePublicId){
        await deleteFile(deletedUser.profileAvatar.imagePublicId)
    }

    await commentModel.deleteMany({targettedBlog: { $in: deletedUser.blogs }})
    await blogModel.deleteMany({author: id})
    await commentModel.updateMany({author: id}, {$set: {author: process.env.SYSTEM_DELETED_USER_ID}})
    return deletedUser
}

exports.updateUserById = async (id, body, file) => {
    const existingUser = await userModel.findOne({email: body.email})
    if(existingUser){
        return "ALREADY_EXISTS"
    }

    if(body.password){
        body.password = await bcrypt.hash(body.password, 10)
    }

    const currentUser = await userModel.findById(id)
    if(!currentUser){
        return "NOT_FOUND"
    }

    if(file){
        const response = await uploadFile(file.buffer)
        if(currentUser.profileAvatar && currentUser.profileAvatar.imagePublicId){
            await deleteFile(currentUser.profileAvatar.imagePublicId)
        }

        body["profileAvatar"] = {
            imageUrl: response.url,
            imagePublicId: response.publicId,
        }
    }else if (body.deleteProfileAvatar === "true" || body.deleteProfileAvatar === true){
        if(currentUser.profileAvatar && currentUser.profileAvatar.imagePublicId){
            await deleteFile(currentUser.profileAvatar.imagePublicId)
        }
        body["profileAvatar"] = {
            imageUrl: null,
            imagePublicId: null
        }
    }

    delete body.deleteProfileAvatar


    const updatedUser = await userModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {new: true}).populate("blogs", "title")
    
    if(!updatedUser){
        return null
    }
    return updatedUser
}