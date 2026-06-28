const { Router } = require("express");
const expenseRouter = new Router()

const expenseController = require("../controllers/expense.controller.js");
const isKeyMiddleware = require("../middlewares/isKey.middleware.js");
const requiredFieldsMiddleware = require("../middlewares/requiredFields.middleware.js");
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware.js");

expenseRouter.get("/", expenseController.getAllExpenses)

expenseRouter.post("/", requiredFieldsMiddleware, expenseController.createExpense)

expenseRouter.get("/top-:number", expenseController.getMostExpensive)

expenseRouter.get("/:id", isValidMongoIdMiddleware, expenseController.getExpenseById)

expenseRouter.delete("/:id", isValidMongoIdMiddleware, isKeyMiddleware, expenseController.deleteExpenseById)

expenseRouter.put("/:id", isValidMongoIdMiddleware, expenseController.updateExpenseById)

module.exports = expenseRouter