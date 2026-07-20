import dotenv from "dotenv"
dotenv.config()
import connectToDb from "./config/db.config.js"
import express, { Request, Response } from "express"
import cors from "cors"
import { userRouter } from "./users/user.controller.js"

import http from "http"
import {Server} from "socket.io"
import { startSockets } from "./sockets/socket.js"
import { quizRouter } from "./quizzes/quiz.controller.js"


const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

startSockets(io)


app.use("/users", userRouter)
app.use("/quizzes", quizRouter)

app.get("/", (req:Request, res:Response) => {
    res.send(`<h1 style="color: Orange">Hello World</h1>`)
})


connectToDb().then(() => {
    server.listen(4000, () => {
        console.log("Server running on http://localhost:4000")
    })
}).catch((e) => {
    console.error("Connect failed", e)
})