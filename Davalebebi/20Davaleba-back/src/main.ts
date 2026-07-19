import dotenv from "dotenv"
dotenv.config()
import connectToDb from "./config/db.config.js"
import express, { Request, Response } from "express"
import cors from "cors"
import { userRouter } from "./users/user.controller.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)

app.get("/", (req:Request, res:Response) => {
    res.send(`<h1 style="color: Orange">Hello World</h1>`)
})


connectToDb().then(() => {
    app.listen(4000, () => {
        console.log("Server running on http://localhost:4000")
    })
}).catch((e) => {
    console.error("Connect failed", e)
})