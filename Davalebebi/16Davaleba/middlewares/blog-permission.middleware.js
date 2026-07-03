const blogModel = require ("../blogs/blog.model.js")

module.exports = async (req, res, next) => {
    try{
        const { blogId } = req.params
        const blog = await blogModel.findById(blogId)
        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        const isBlogAuthor = blog.author.toString() === req.userId
        const isAdmin = req.userRole === "admin"

        if(req.method === "PUT"){
            if(!isBlogAuthor){
                return res.status(401).json({message: "No permission"})
            }
        }
        if(req.method === "DELETE"){
            if(!isBlogAuthor && !isAdmin){
                return res.status(401).json({message: "No permission"})
            }
        }
        next()
    }catch(e){
        return res.status(401).json({message: "No Permission"})
    }
}