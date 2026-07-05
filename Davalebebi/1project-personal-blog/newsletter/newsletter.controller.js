const { Router } = require("express")

const newsLetterRouter = new Router()
const newsletterService = require("./newsletter.service.js")
const newsletterEmailValidateMiddleware = require("../middlewares/newsletter-email-validate.middleware.js")
const emailSubscribeDto = require("./dto/newsletter.dto.js")


newsLetterRouter.post("/", newsletterEmailValidateMiddleware(emailSubscribeDto), async (req, res) => {
    const email = req.user ? req.user.email : req.body.email

    const result = await newsletterService.subscribeWithEmail(email)
    if(result === "ALREADY_SUBSCRIBED"){
        return res.status(400).json({message: "Email already subscribed"})
    }

    res.status(201).json({subscribed: true, data: result})
})

newsLetterRouter.post("/unsubscribe", newsletterEmailValidateMiddleware(emailSubscribeDto), async (req, res) => {
    const email = req.user ? req.user.email : req.body.email

    const result = await newsletterService.UnSubscribeWithEmail(email)
    if(result === "NOT_FOUND"){
        return res.status(404).json({message: "Email not found"})
    }
    if(result === "ALREADY_UNSUBSCRIBED"){
        return res.status(400).json({message: "Email already unsubscribed"})
    }

    res.json({unsubscribed: true, data: result})
})

module.exports = newsLetterRouter