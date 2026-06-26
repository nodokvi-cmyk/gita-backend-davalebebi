const { Router } = require("express");
const expenseRouter = new Router()

const expenseController = require("../controllers/expense.controller.js");
const isKeyMiddleware = require("../middlewares/isKey.middleware.js");
const requiredFieldsMiddleware = require("../middlewares/requiredFields.middleware.js");

expenseRouter.get("/", expenseController.getAllExpenses)

expenseRouter.post("/", requiredFieldsMiddleware, expenseController.createExpense)

expenseRouter.get("/:expenseId", expenseController.getExpenseById)

expenseRouter.delete("/:expenseId", isKeyMiddleware, expenseController.deleteExpenseById)

expenseRouter.put("/:expenseId", expenseController.updateExpenseById)

module.exports = expenseRouter