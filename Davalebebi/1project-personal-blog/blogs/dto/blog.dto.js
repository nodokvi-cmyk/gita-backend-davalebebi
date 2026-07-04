const z = require("zod");

const createBlogDto = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})

const updateBlogDto = createBlogDto.partial()

module.exports = {createBlogDto, updateBlogDto}