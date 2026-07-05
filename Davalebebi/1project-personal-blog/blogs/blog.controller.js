const { Router } = require("express");
const blogService = require("./blog.service.js");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware.js");
const isAuthMiddleware = require("../middlewares/is-auth.middleware.js");
const commentRouter = require("../comments/comment.controller.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const { createBlogDto, updateBlogDto } = require("./dto/blog.dto.js");
const resourcePermissionMiddleware = require("../middlewares/resource-permission.middleware.js");
const blogModel = require("./blog.model.js");
const isAdminMiddleware = require("../middlewares/is-admin.middleware.js");

const blogRouter = new Router()

blogRouter.use("/:blogId/comments", commentRouter)

blogRouter.get("/", async (req, res) => {
    const blogs = await blogService.getAllBlogs(req.query)
    res.json(blogs)
})

blogRouter.get("/:blogId", isValidMongoIdMiddleware("blogId"), async (req, res) => {
    const blog = await blogService.getBlogById(req.params.blogId)
    if(!blog){
        res.status(404).json({message: "Blog not found"})
    }
    res.json(blog)
})

blogRouter.post("/", isAuthMiddleware, isAdminMiddleware, validateMiddleware(createBlogDto), async (req, res) => {  
    const newBlog = await blogService.createBlog(req.body, req.userId)
    res.status(201).json({created: true, data: newBlog})
})

blogRouter.delete("/:blogId", isValidMongoIdMiddleware("blogId"), isAuthMiddleware, resourcePermissionMiddleware(blogModel, "blogId"), async (req, res) => {
    const deletedBlog = await blogService.deleteBlogById(req.params.blogId)
    if(!deletedBlog){
        return res.status(404).json({message: "Blog not found"})
    }
    res.json({deleted: true, data: deletedBlog})
})

blogRouter.put("/:blogId", isValidMongoIdMiddleware("blogId"), isAuthMiddleware, resourcePermissionMiddleware(blogModel, "blogId"), validateMiddleware(updateBlogDto), async (req, res) => {
    const updatedBlog = await blogService.updateBlogById(req.params.blogId, req.body)
    if(!updatedBlog){
        return res.status(404).json({message: "Blog not found"})
    }
    res.json({updated: true, data: updatedBlog})
})

module.exports = blogRouter