const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = async (req, res, next) => {
    try{
        // Bearer {Token}
        const authorization = req.headers["authorization"]
        if(!authorization){
            return res.status(401).json({message: "Not Authorized"})
        }

        const token = authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Not Authorized"})
        }

        const payLoad = await jwt.verify(token, process.env.JWT_SECRET)
        req["userId"] = payLoad.userId
        req["userRole"] = payLoad.role
        next()
    }catch(e) {
        return res.status(401).json({message: "Not Authorized"})
    }
}