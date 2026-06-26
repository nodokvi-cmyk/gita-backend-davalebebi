
const expenseService = require("../services/expense.service.js")

exports.getAllExpenses = async (req, res) => {
    try{
        const expenses = await expenseService.getAllExpenses(req.query)
        res.json(expenses)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}

exports.createExpense = async (req, res) => {
    try{    
        const newExpense = await expenseService.createExpense(req.body)
        res.status(201).json({success: true, data: newExpense})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
}

exports.getExpenseById = async (req, res) => {
    try{
        const expenseById = await expenseService.getExpenseById(req.params)
        res.json(expenseById)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

exports.deleteExpenseById = async (req, res) => {
    try{
        const deletedExpense = await expenseService.deleteExpenseById(req.params)
        res.status(200).json({success: true, message: deletedExpense})
    }catch (e){
        res.status(404).json({message: e.message})
    }
}

exports.updateExpenseById = async (req, res) => {
    try{
        const expenseToUpdate = await expenseService.updateExpenseById(req.params, req.body)
        res.json({success: true, message: expenseToUpdate})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}