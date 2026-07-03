const { Router } = require("express");

const authRouter = new Router()
const authService = require("./auth.service.js");
const validateMiddleware = require("../middlewares/validate.middleware.js");
const signUpDto = require("./dto/sign-up.dto.js");
const signInDto = require("./dto/sign-in.dto.js");
const isAuthMiddleware = require("../middlewares/is-auth.middleware.js");

authRouter.post("/sign-up", validateMiddleware(signUpDto), async (req, res) => {
    const {fullName, age, email, password, birthDate} = req.body

    const existingUser = await authService.signUp({fullName, age, email, password, birthDate})
    if(existingUser === "ALREADY_EXISTS"){
        return res.status(400).json({message: "User with this email already registered"})
    }

    res.status(201).json({message: "User Registered Successfully"})
})

authRouter.post("/sign-in", validateMiddleware(signInDto), async (req, res) => {
    const {email, password} = req.body

    const response = await authService.signIn({email, password})
    if(response === "INVALID_CREDENTIALS"){
        return res.status(400).json({message: "Email or Password is incorrect"})
    }

    res.json({accessToken: response})
})

authRouter.get("/current-user", isAuthMiddleware, async (req, res) => {
    const user = await authService.currentUser(req.userId)

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    res.json(user)
})

module.exports = authRouter