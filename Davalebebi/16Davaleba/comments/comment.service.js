const userModel = require("../users/user.model.js")
const blogModel = require("../blogs/blog.model.js")
const commentModel = require("./comment.model.js")

exports.getAllComments = async (blogId) => {
    const comments = await commentModel.find({blog: blogId}).populate("author", "fullName email")
    return comments
}

exports.getCommentById = async (id) => {
    const comment = await commentModel.findById(id).populate("author", "fullName email")
    if(!comment){
        return null
    }
    return comment
}

exports.createComment = async (body, userId, blogId) => {
    const newComment = await commentModel.create({
        author: userId,
        comment: body.comment,
        targettedBlog: blogId
    })

    await blogModel.findByIdAndUpdate(blogId, {
        $push: { comments: newComment._id }
    })

    await userModel.findByIdAndUpdate(userId, {
        $push: { comments: newComment._id }
    })

    return await newComment.populate("author", "fullName email")
}

exports.deleteComment = async (id) => {
    const deletedComment = await commentModel.findByIdAndDelete(id)

    await blogModel.findByIdAndUpdate(deletedComment.targettedBlog, {
        $pull: { comments: id }
    })

    await userModel.findByIdAndUpdate(deletedComment.author, {
        $pull: { comments: id }
    })
    return deletedComment
}

exports.updateComment = async (id, body) => {
    const updatedComment = await commentModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {new: true}).populate("author", "fullName email")
    return updatedComment
}