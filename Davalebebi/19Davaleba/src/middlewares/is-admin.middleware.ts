import { NextFunction, Request, Response } from "express"


const isAdminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    if(req.headers["role"] !== "admin"){
        return res.status(403).json({message: "No Permission"})
    }
    next()
}

export default isAdminMiddleware