const blogModel = require("../blogs/blog.model.js")
const commentModel = require("../comments/comment.model.js")
const userModel = require("./user.model.js")

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

    await commentModel.deleteMany({targettedBlog: { $in: deletedUser.blogs }})
    await blogModel.deleteMany({author: id})
    await commentModel.updateMany({author: id}, {$set: {author: null}})
    return deletedUser
}

exports.updateUserById = async (id, body) => {
    const existingUser = await userModel.findOne({email: body.email})
    if(existingUser){
        return "ALREADY_EXISTS"
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {new: true}).populate("blogs", "title")
    
    if(!updatedUser){
        return null
    }
    return updatedUser
}