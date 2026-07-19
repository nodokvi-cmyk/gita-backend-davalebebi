import { NextFunction, Request, Response } from "express"

import { isValidObjectId } from"mongoose"
import { StatusCodes } from "../shared/statuscodes.js"



export const isValidMongoIdMiddleware = (idType: string) => (req:Request, res:Response, next:NextFunction) => {
    const id = req.params[idType]
    if(!isValidObjectId(id)){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Wrong ID Provided"})
    }
    next()
}