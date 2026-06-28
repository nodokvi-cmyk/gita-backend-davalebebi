const expenseModel = require("../models/expense.model.js")
const { readFile, writeFile } = require("../utils/utils.js")


exports.getAllExpenses = async (query) => {
    const filter = {}
    if("category" in query){
        const categories = query.category.split(",")
        const categoryNameStart = categories.map((category) => new RegExp(`^${category}`))

        filter["category"] = {$in: categoryNameStart}
    }
    if("amountFrom" in query){
        filter["price"] = {
            ...filter["price"],
            "$gte": Number(query.amountFrom)
        }
    }
    if("amountTo" in query){
        filter["price"] = {
            ...filter["price"],
            "$lte": Number(query.amountTo)
        }
    }

    const expenses = await expenseModel.find(filter)
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
    const newExpense = await expenseModel.create({
        category: body.category,
        price: body.price
    })
    return newExpense
}

exports.getMostExpensive = async (number) => {
    const priceDescending = await expenseModel.find().sort({price: -1}).limit(Number(number))
    return priceDescending
}

exports.getExpenseById = async (id) => {
    const expense = await expenseModel.findById(id)
    if(!expense){
        return null
    }
    return expense
}

exports.deleteExpenseById = async (id) => {
    const deletedExpense = await expenseModel.findByIdAndDelete(id)
    if (!deletedExpense){
        return null
    }
    return deletedExpense
}

exports.updateExpenseById = async (id, body) => {
    const updatedExpense = await expenseModel.findByIdAndUpdate(id, {
        ...body,
        $inc: {__v: 1},
    }, {
        new: true,
        runValidators: true
    })
    if(!updatedExpense){
        return null
    }
    return updatedExpense
}