const z = require("zod");


const emailSubscribeDto = z.object({
    body: z.object({
        email: z.email().optional()
    }),
    user: z.object({
        email: z.email()
    }).optional()
}).refine((input) => {
    if(!input.user){
        if(!input.body || !input.body.email){
            return false
        }

        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return validEmail.test(input.body.email)
    }
    return true
}, {
    message: "Please enter a valid email address",
    path: ["body", "email"]
})

module.exports = emailSubscribeDto