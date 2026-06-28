

module.exports = (req, res, next) => {
    const key = req.headers["key"]
    if(!key || key !== "random123"){
        return res.status(403).json({message: "No Permission"})
    }
    next()
}