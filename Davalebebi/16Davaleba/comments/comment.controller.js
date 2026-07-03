const { Router } = require("express");
const commentService = require("./comment.service.js");
const isAuthMiddleware = require("../middlewares/is-auth.middleware.js");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware.js");
const commentPermissionMiddleware = require("../middlewares/comment-permission.middleware.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const commentDto = require("./dto/comment.dto.js");


const commentRouter = new Router({ mergeParams: true })

commentRouter.get("/", async (req, res) => {
    const comments = await commentService.getAllComments(req.params.blogId)
    res.json(comments)
})

commentRouter.get("/:commentId", isValidMongoIdMiddleware, async (req, res) => {
    const comment = await commentService.getCommentById(req.params.commentId)
    if(!comment){
        return res.status(404).json({message: "Comment not found"})
    }
    res.json(comment)
})

commentRouter.post("/", isAuthMiddleware, validateMiddleware(commentDto), async (req, res) => {
    const newComment = await commentService.createComment(req.body, req.userId, req.params.blogId)
    res.status(201).json({created:true, data: newComment})
})

commentRouter.delete("/:commentId", isValidMongoIdMiddleware, isAuthMiddleware, commentPermissionMiddleware, async(req, res) => {
    const deletedComment = await commentService.deleteComment(req.params.commentId)
    res.json({deleted: true, data: deletedComment})
})

commentRouter.put("/:commentId", isValidMongoIdMiddleware, isAuthMiddleware, commentPermissionMiddleware, validateMiddleware(commentDto), async (req, res) => {
    const updatedComment = await commentService.updateComment(req.params.commentId, req.body)
    res.json({updated: true, data: updatedComment})
})

module.exports = commentRouter