
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

exports.getMostExpensive = async (req, res) => {
    try{
        const number = req.params.number
        const priceDescending = await expenseService.getMostExpensive(number)
        res.json({
            filter: `top ${number} most expensive expenses`,
            list: priceDescending
        })
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

exports.getExpenseById = async (req, res) => {
    try{
        const expense = await expenseService.getExpenseById(req.params.id)
        if(!expense){
            return res.status(404).json({message: "Expense not found"})
        }
        res.json(expense)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

exports.deleteExpenseById = async (req, res) => {
    try{
        const deletedExpense = await expenseService.deleteExpenseById(req.params.id)
        if (!deletedExpense){
            return res.status(404).json({message: "Expense not found"})
        }
        res.json({success: true, message: deletedExpense})
    }catch (e){
        res.status(404).json({message: e.message})
    }
}

exports.updateExpenseById = async (req, res) => {
    try{
        const updatedExpense = await expenseService.updateExpenseById(req.params.id, req.body)
        if(!updatedExpense){
            return res.status(404).json({message: "Expense not found"})
        }
        res.json({success: true, message: updatedExpense})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}