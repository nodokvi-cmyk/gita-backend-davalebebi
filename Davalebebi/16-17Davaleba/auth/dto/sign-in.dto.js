const z = require("zod");


const signInDto = z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
    .refine((passwordInput) => /^(?=.*[a-zA-Z])(?=.*\d)/.test(passwordInput), {
        message: "Password must include at least 1 letter and 1 number"
    })
})

module.exports = signInDto