const express = require("express")
const app = express()
const connectToDb = require("./config/db.config.js")
const userRouter = require("./users/user.controller.js")
const authRouter = require("./auth/auth.controller.js")
const blogRouter = require("./blogs/blog.controller.js")
const commentRouter = require("./comments/comment.controller.js")

app.use(express.json())

app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/blogs", blogRouter)

app.get("/", (req, res) => {
    res.send(`<h1 style="color: red">Hello World</h1>`)
})

connectToDb().then(() => {
    app.listen(4000, () => {
        console.log("Server running on http://localhost:4000")
    })
})