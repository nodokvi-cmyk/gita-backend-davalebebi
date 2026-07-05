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

    const page = Math.max(Number(query.page) || 1, 1)
    const take = Math.max(Math.min(Number(query.take) || 10, 10), 1)
    const skip = (page - 1) * take

    const blogs = await blogModel.find(filter)
    .populate("author", "fullName email")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(take)

    const allBlogs = await blogModel.countDocuments(filter)

    return {
        blogs,
        currentPage: page,
        totalPages: Math.ceil(allBlogs / take),
        allBlogs
    }
}

exports.getBlogById = async (id) => {
    const blog = await blogModel.findById(id)
    .populate("author", "fullName email")
    .populate({
        path: "comments",
        select: "comment author createdAt",
        options: {sort: {createdAt: -1}},
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
        description: body.description,
        content: body.content,
        author: userId
    })

    await userModel.findByIdAndUpdate(userId, {
        $push: { blogs: newBlog._id}
    })
    return await newBlog.populate("author", "fullName email")
}

exports.deleteBlogById = async (id) => {
    const blogComments = await commentModel.find({targettedBlog: id})
    const commentIds = blogComments.map((comment) => comment._id)
    const deletedBlog = await blogModel.findByIdAndDelete(id)
    
    await userModel.findByIdAndUpdate(deletedBlog.author, {
        $pull: { blogs: id }
    })

    await userModel.updateMany(
        {comments:{ $in: commentIds}},
        {$pull: {comments: {$in: commentIds}}}
    )

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

exports.getHomePage = async () => {
    const admin = await userModel.findOne({role: "admin"}).select("fullName bio socialMediaLinks")

    const latestBlogs = await blogModel.find().sort({createdAt: -1}).limit(5).select("title description createdAt")
    return {admin, blogs: latestBlogs}
}