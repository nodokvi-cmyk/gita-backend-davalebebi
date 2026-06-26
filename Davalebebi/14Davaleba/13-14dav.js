

const express = require("express")
const { readFile, writeFile } = require("./utils/utils.js")
const expenseRouter = require("./routers/expense.router.js")
const randomQuoteRouter = require("./routers/randomQuote.router.js")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send(`<h1 style="color: red">Hello World</h1>`)
})

app.use("/expenses", expenseRouter)
app.use("/random-quote", randomQuoteRouter)

app.listen(4000, () => {
    console.log(`server running on http://localhost:4000`)
})
