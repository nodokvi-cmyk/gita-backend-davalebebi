

const express = require("express")
const { readFile, writeFile } = require("./utils/utils.js")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send(`<h1 style="color: red">Hello World</h1>`)
})


app.get("/expenses", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    let paginationData = expenses

    const page = Math.max(Number(req.query.page) || 1, 1)
    const take = Math.max(Math.min(Number(req.query.take) || 30, 30), 1)
    const totalPages = Math.ceil(expenses.length / take || 1)
    if(page > totalPages){
        return res.status(400).json({message: `There are ${totalPages} pages in total`})
    }

    paginationData = paginationData.slice((page - 1) * take, page * take)
    res.json(paginationData)
})

app.post("/expenses", async(req, res) => {
    if(!req.body || !req.body.category || !req.body.price){
        return res.status(400).json({message: "price and category is required"})
    }
    const expenses = await readFile("expenses.json", true)
    const lastId = expenses[expenses.length - 1]?.id || 0

    const newExpense = {
        id: lastId + 1,
        category: req.body.category,
        price: req.body.price,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
    }
    expenses.push(newExpense)
    await writeFile("expenses.json", expenses)
    res.status(201).json({success: true, data: newExpense})
})

app.get("/expenses/:expenseId", async (req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        return res.status(404).json({message: "Expense not found"})
    }
    res.json(expenses[desiredExpenseIndex])
})

app.delete("/expenses/:expenseId", async (req, res) => {
    const secret = req.headers["secret"]
    if(!secret || secret !== "random123"){
        return res.status(401).json({message: "No permission"})
    }

    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        return res.status(404).json({message: "Expense not found"})
    }

    const deletedExpense = expenses.splice(desiredExpenseIndex, 1)
    await writeFile("expenses.json", expenses)
    res.status(200).json({success: true, message: deletedExpense})
})

app.put("/expenses/:expenseId", async(req, res) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(req.params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        return res.status(404).json({message: "Expense not found"})
    }

    const expenseToUpdate = expenses[desiredExpenseIndex]
    if(req.body.category){
        expenseToUpdate.category = req.body.category
    }
    if(req.body.price){
        expenseToUpdate.price = req.body.price
    }
    if(req.body.price || req.body.category){
        expenseToUpdate.lastUpdated = new Date().toISOString()
    }
    await writeFile("expenses.json", expenses)
    res.json({success: true, message: expenses[desiredExpenseIndex]})
})


app.listen(5000, () => {
    console.log(`server running on http://localhost:5000`)
})
