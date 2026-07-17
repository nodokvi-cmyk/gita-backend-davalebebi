import express from "express"
import connectToDb from "./config/db.config"
import productRouter from "./products/product.controller"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.use("/products", productRouter)

connectToDb().then(() => {
    app.listen(4000, () => {
        console.log(`server running on http://localhost:4000`)
    })
})