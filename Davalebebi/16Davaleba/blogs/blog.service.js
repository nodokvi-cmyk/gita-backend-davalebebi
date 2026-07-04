const blogModel = require("./blog.model.js")
const userModel = require("../users/user.model.js")
const commentModel = require("../comments/comment.model.js")

exports.getAllBlogs = async (query) => {
    const filter = {}
    if("author" in query){
        const users = await userModel.find({
            fullName: {$regex: `^${query.author}`, $options: "i"}
        })

        const desiredAuthorsIds = users.map((user) => user._id)
        filter["author"] = { $in: desiredAuthorsIds }
    }

    if("title" in query){
        filter["title"] = {
            $regex: `^${query.title}`,
            $options: "i"
        }
    }
    const blogs = await blogModel.find(filter).populate("author", "fullName email")
    return blogs
}

exports.getBlogById = async (id) => {
    const blog = await blogModel.findById(id)
    .populate("author", "fullName email")
    .populate({
        path: "comments",
        select: "comment author",
        populate: {
            path: "author",
            select: "fullName -_id"
        }
    })

    if (!blog){
        return null
    }
    return blog
}

exports.createBlog = async (body, userId) => {
    const newBlog = await blogModel.create({
        title: body.title,
        content: body.content,
        author: userId
    })

    await userModel.findByIdAndUpdate(userId, {
        $push: { blogs: newBlog._id}
    })
    return await newBlog.populate("author", "fullName email")
}

exports.deleteBlogById = async (id) => {
    const deletedBlog = await blogModel.findByIdAndDelete(id)
    
    await userModel.findByIdAndUpdate(deletedBlog.author, {
        $pull: { blogs: id }
    })

    await commentModel.deleteMany({targettedBlog: id})
    return deletedBlog
}

exports.updateBlogById = async (id, body) => {
    const updatedBlog = await blogModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {new: true}).populate("author", "fullName email")
    return updatedBlog
}