

module.exports = (req, res, next) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1
    if (randomNumber % 2 !== 0){
        return res.status(400).json({message: "Unlucky"})
    }
    next()
}