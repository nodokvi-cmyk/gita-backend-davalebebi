const { Router } = require("express");
const blogService = require("../blogs/blog.service.js")

const homeRouter = new Router()

homeRouter.get("/", async (req, res) => {
    const homePageData = await blogService.getHomePage()
    res.json(homePageData)
})

module.exports = homeRouter