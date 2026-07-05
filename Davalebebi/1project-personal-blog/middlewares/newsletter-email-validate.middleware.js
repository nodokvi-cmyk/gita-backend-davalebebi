const { ZodError } = require("zod");


module.exports = (schema) => (req, res, next) => {
    try{
        const result = schema.parse({
            body: req.body || {},
            user: req.user
        })

        req.body = result.body
        next()
    } catch (e) {
        if(e instanceof ZodError){
            const errors = e.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))

            return res.status(400).json({
                message: "validation error",
                errors
            })
        }
    }
}