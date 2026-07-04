const z = require("zod");


const updateUserDto = z.object({
    fullName: z.string().trim()
    .refine((fullNameInput) => {
        const words = fullNameInput.split(/\s+/)
        const isTwoWords = words.length >= 2
        const isEachWordTwoSymbol = words.every((word) => word.length >=2)
        return isTwoWords && isEachWordTwoSymbol
    }, {
        message: "Fullname must include first and last names"
    }),
    age: z.number(),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
    .refine((passwordInput) => /^(?=.*[a-zA-Z])(?=.*\d)/.test(passwordInput), {
        message: "Password must include at least 1 letter and 1 number"
    }),
    birthDate: z.string().date({message: "Format - YYYY-MM-DD"})
}).partial()

module.exports = updateUserDto