
const axios = require("axios")

exports.getRandomQuote = async () => {
    const resp = await axios.get("https://dummyjson.com/quotes")
    const randomQuote = resp.data.quotes[Math.floor(Math.random() * resp.data.quotes.length)]
    return {
        quote: randomQuote.quote,
        author: randomQuote.author
    }
}