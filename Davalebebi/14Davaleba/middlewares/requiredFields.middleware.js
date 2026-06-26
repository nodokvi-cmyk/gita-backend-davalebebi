

module.exports = (req, res, next) => {
    if(!req.body || !req.body.category || !req.body.price){
        return res.status(400).json({message: "Price and Category are required"})
    }
    next()
}