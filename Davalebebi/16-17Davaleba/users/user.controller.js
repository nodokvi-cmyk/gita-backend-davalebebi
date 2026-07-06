const { Router } = require("express");
const userService = require("./user.service.js");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");
const isAuthMiddleware = require("../middlewares/is-auth.middleware.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const updateUserDto = require("./dto/updateUser.dto.js");
const upload = require("../middlewares/upload.middleware.js");

const userRouter = new Router()

userRouter.get("/", async (req, res) => {
    const users = await userService.getAllUsers(req.query)
    res.json(users)
})

userRouter.get("/:userId", isValidMongoIdMiddleware("userId"), async (req, res) => {
    const user = await userService.getUserById(req.params.userId)
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    res.json(user)
})

userRouter.delete("/:userId", isValidMongoIdMiddleware("userId"), isAuthMiddleware, roleMiddleware(["admin"]), async (req, res) => {
    const deletedUser = await userService.deleteUserById(req.params.userId)
    if(!deletedUser){
        return res.status(404).json({message: "User not found"})
    }
    res.json({deleteSuccess: true, deletedUser: deletedUser})
})

userRouter.put("/:userId", isValidMongoIdMiddleware("userId"), isAuthMiddleware, roleMiddleware([]), upload.single("profileAvatar"), validateMiddleware(updateUserDto), async (req, res) => {
    const updatedUser = await userService.updateUserById(req.params.userId, req.body, req.file)
    if(!updatedUser){
        return res.status(404).json({message: "User not found"})
    }
    if(updatedUser === "ALREADY_EXISTS"){
        return res.status(400).json({message: "User with this email already exists"})
    }
    res.json({updateSuccess: true, updatedUser: updatedUser})
})

module.exports = userRouter