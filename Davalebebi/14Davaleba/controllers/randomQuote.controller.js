
const randomQuoteService = require("../services/randomQuote.service.js")

exports.getRandomQuote = async (req, res) => {
    try{
        const randomQuote = await randomQuoteService.getRandomQuote()
        res.json({message: randomQuote})
    }catch(e){
        res.status(400).json({message: e.message})
    }
}