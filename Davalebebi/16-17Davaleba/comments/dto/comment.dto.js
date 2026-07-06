const z = require("zod");

const commentDto = z.object({
    comment: z.string().min(1)
})

module.exports = commentDto