const { Router } = require("express");
const randomQuoteRouter = new Router()

const randomQuoteController = require("../controllers/randomQuote.controller.js")
const isEvenMiddleware = require("../middlewares/isEven.middleware.js");

randomQuoteRouter.get("/", isEvenMiddleware, randomQuoteController.getRandomQuote)

module.exports = randomQuoteRouter