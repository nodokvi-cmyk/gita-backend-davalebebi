import { Request, Response, Router } from "express";
import userService from "./user.service.js"
import { StatusCodes } from "../shared/statuscodes.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createUserDto, CreateUserType, updateUserDto, UpdateUserType } from "./dto/create-update-user.dto.js";
import { isValidMongoIdMiddleware } from "../middlewares/is-valid-mongo-id.middleware.js";
import { UserType } from "./user.model.js";


export const userRouter = Router()

userRouter.get("/", async (req:Request, res:Response) => {
    const users = await userService.getAllUsers()
    res.json(users)
})

userRouter.post("/", validateMiddleware(createUserDto), async(req:Request, res:Response) =>{
    const newUser = await userService.createUser(req.body as CreateUserType)
    res.status(StatusCodes.CREATED).json({created:true, data: newUser})
})

userRouter.get("/:userId", isValidMongoIdMiddleware("userId"), async(req:Request, res:Response) => {
    const desiredUser = await userService.getUserById(req.params.userId as string)
    if(!desiredUser){
        return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"})
    }
    res.json(desiredUser)
})

userRouter.delete("/:userId", isValidMongoIdMiddleware("userId"), async(req:Request, res:Response) => {
    const deletedUser = await userService.deleteUserById(req.params.userId as string)
    if(!deletedUser){
        return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"})
    }
    res.json({deleted:true, data: deletedUser})
})

userRouter.put("/:userId", isValidMongoIdMiddleware("userId"), validateMiddleware(updateUserDto), async(req:Request, res:Response) => {
    const updatedUser = await userService.updateUserbyId(req.params.userId as string, req.body as UpdateUserType)
    if(!updatedUser){
        return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"})
    }
    res.json({updated: true, data: updatedUser})
})
