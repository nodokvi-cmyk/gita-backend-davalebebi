import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { StatusCodes } from "../shared/statuscodes.js"
import z from "zod"



export const validateMiddleware = (schema:z.ZodSchema, property: "body" | "query" | "params" = "body") => (req:Request, res:Response, next:NextFunction) => {
    try{
        const result = schema.parse(req[property] || {})
        req[property] = result

        next()
    } catch (e) {
        if(e instanceof ZodError){
            const errors = e.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))

            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "validation error",
                errors
            })
        }
        next(e)
    }
}