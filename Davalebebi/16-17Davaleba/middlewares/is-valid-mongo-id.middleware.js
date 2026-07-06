const { isValidObjectId } = require("mongoose")



module.exports = (idType) => (req, res, next) => {
    const id = req.params[idType]
    if(!isValidObjectId(id)){
        return res.status(400).json({message: "Wrong ID Provided"})
    }
    next()
}