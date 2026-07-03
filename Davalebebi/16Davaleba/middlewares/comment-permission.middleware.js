const commentModel = require("../comments/comment.model.js")

module.exports = async (req, res, next) => {
    try{
        const { commentId } = req.params
        const comment = await commentModel.findById(commentId)
        if(!comment){
            return res.status(404).json({message: "Comment not found"})
        }
        const isCommentAuthor = comment.author.toString() === req.userId
        const isAdmin = req.userRole === "admin"

        if(req.method === "PUT"){
            if(!isCommentAuthor){
                return res.status(401).json({message: "No permission"})
            }
        }
        if(req.method === "DELETE"){
            if(!isCommentAuthor && !isAdmin){
                return res.status(401).json({message: "No permission"})
            }
        }
        next()
    }catch(e){
        return res.status(401).json({message: "No Permission"})
    }
}