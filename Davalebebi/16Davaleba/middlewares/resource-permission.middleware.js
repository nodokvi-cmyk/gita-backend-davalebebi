
module.exports = (model, idType) => async (req, res, next) => {
    try{
        const id = req.params[idType]
        const targettedResource = await model.findById(id)
        if(!targettedResource){
            return res.status(404).json({message: "Resource  not found"})
        }
        const isAuthor = targettedResource.author.toString() === req.userId
        const isAdmin = req.userRole === "admin"

        if(req.method === "PUT"){
            if(!isAuthor){
                return res.status(401).json({message: "No permission"})
            }
        }
        if(req.method === "DELETE"){
            if(!isAuthor && !isAdmin){
                return res.status(401).json({message: "No permission"})
            }
        }
        next()
    }catch(e){
        return res.status(401).json({message: "No Permission"})
    }
}