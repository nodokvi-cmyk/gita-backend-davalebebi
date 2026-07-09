const express = require("express")
const { readFile, writeFile } = require("./utils/utils.js")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))



app.get("/", async (req, res) => {
    let expenses = await readFile("expenses.json", true)

    const search = req.query.search || ""
    const page = Math.max(Number(req.query.page) || 1, 1)
    const take = Math.max(Math.min(Number(req.query.take) || 10, 10), 1)

    if(search){
        expenses = expenses.filter((expense) => expense.category.toLowerCase().startsWith(search.toLowerCase()))
    }

    const starting = (page - 1) * take
    const skip = page * take
    const paginatedExpenses = expenses.slice(starting, skip)
    const totalPages = Math.ceil(expenses.length / take) || 1

    res.render("pages/home", {name: "Practicing EJS", metaData: "Expenses List", expenses: paginatedExpenses, currentPage: page, totalPages: totalPages, take: take, search: search})
})

app.get("/api/expenses", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    res.json(expenses)
})

app.get("/expenses/:expenseId", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const desiredExpense = expenses.find((expense) => expense.id === id)
    res.render("pages/expense-detail", {desiredExpense})
})

app.post("/api/expenses", async (req, res) => {
    const {category, price} = req.body
    const expenses = await readFile("expenses.json", true)
    const lastId = expenses[expenses.length - 1]?.id || 0
    const newExpense = {
        id: lastId + 1,
        category,
        price: Number(price),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    }
    expenses.push(newExpense)
    await writeFile("expenses.json", expenses)
    res.redirect("/")
})

app.get("/create-expense", (req, res) => {
    res.render("pages/create-expense")
})

app.post("/api/expenses/:expenseId/delete", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const targettedExpenseIndex = expenses.findIndex((expense) => expense.id === id)

    if(targettedExpenseIndex === -1){
        return
    }

    expenses.splice(targettedExpenseIndex, 1)
    await writeFile("expenses.json", expenses)
    res.redirect("/")
})

app.get("/expenses/:expenseId/update", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const targettedExpense = expenses.find((expense) => expense.id === id)

    res.render("pages/expense-update", {targettedExpense})
})


app.post("/api/expenses/:expenseId/update", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const targettedExpenseIndex = expenses.findIndex((expense) => expense.id === id)

    if(targettedExpenseIndex === -1){
        return
    }
    
    const updateReq = {}
    if(req.body.category){
        updateReq["category"] = req.body.category  
    }
    if(req.body.price){
        updateReq["price"] = Number(req.body.price)
    }

    const categoryChanged = req.body.category && req.body.category !== expenses[targettedExpenseIndex].category
    const priceChanged = req.body.price && Number(req.body.price) !== expenses[targettedExpenseIndex].price

    if(categoryChanged || priceChanged){
        updateReq["lastUpdated"] = new Date().toISOString()
    }

    expenses[targettedExpenseIndex] = {
        ...expenses[targettedExpenseIndex],
        ...updateReq
    }

    await writeFile("expenses.json", expenses)
    res.redirect("/")
})


app.listen(4000, () => {
    console.log("Server running on http://localhost:4000")
})