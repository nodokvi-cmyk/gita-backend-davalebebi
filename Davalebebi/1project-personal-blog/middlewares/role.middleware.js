const userModel = require("../users/user.model.js")


module.exports = (roles) => async (req, res, next) => {
    try{
        const user = await userModel.findById(req.userId) // isauthmiddleware gives us userId
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const isOwnerOfTheAccount = req.userId === req.params.userId
        const isAdmin = roles.length > 0 && roles.includes(user.role)

        if(!isAdmin && !isOwnerOfTheAccount){
            return res.status(403).json({message: "No permission"})
        }
        next()
    }catch(e){
        return res.status(401).json({message: "No Permission"})
    }
}