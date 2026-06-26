const { readFile, writeFile } = require("../utils/utils.js")


exports.getAllExpenses = async (query) => {
    const expenses = await readFile("expenses.json", true)
    let paginationData = expenses

    const page = Math.max(Number(query.page) || 1, 1)
    const take = Math.max(Math.min(Number(query.take) || 30, 30), 1)
    const totalPages = Math.ceil(expenses.length / take || 1)
    if(page > totalPages){
        throw new Error(`There are ${totalPages} pages in total`)
    }

    paginationData = paginationData.slice((page - 1) * take, page * take)
    return paginationData
}

exports.createExpense = async (body) => {
    const expenses = await readFile("expenses.json", true)
    const lastId = expenses[expenses.length - 1]?.id || 0

    const newExpense = {
        id: lastId + 1,
        category: body.category,
        price: body.price,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
    }
    expenses.push(newExpense)
    await writeFile("expenses.json", expenses)
    return newExpense
}

exports.getExpenseById = async (params) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        throw new Error("Expense not found")
    }
    const expenseById = expenses[desiredExpenseIndex]
    return expenseById
}

exports.deleteExpenseById = async (params) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        throw new Error("Expense not found")
    }

    const deletedExpense = expenses.splice(desiredExpenseIndex, 1)[0]
    await writeFile("expenses.json", expenses)
    return deletedExpense
}

exports.updateExpenseById = async (params, body) => {
    const expenses = await readFile("expenses.json", true)
    const id = Number(params.expenseId)
    const desiredExpenseIndex = expenses.findIndex((expense) => expense.id === id)
    if(desiredExpenseIndex === -1){
        throw new Error("Expense not found")
    }

    const expenseToUpdate = expenses[desiredExpenseIndex]
    if(body.category){
        expenseToUpdate.category = body.category
    }
    if(body.price){
        expenseToUpdate.price = body.price
    }
    if(body.price || body.category){
        expenseToUpdate.lastUpdated = new Date().toISOString()
    }
    await writeFile("expenses.json", expenses)
    return expenseToUpdate
}