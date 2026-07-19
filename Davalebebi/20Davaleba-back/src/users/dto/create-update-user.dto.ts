import z from "zod"

const createUserDto = z.object({
    email: z.email("Enter a valid email address"),
    fullName: z.string().trim()
        .refine((fullNameInput) => {
            const words = fullNameInput.split(/\s+/)
            const isTwoWords = words.length >= 2
            const isEachWordTwoSymbol = words.every((word) => word.length >=2)
            return isTwoWords && isEachWordTwoSymbol
        }, {
            message: "Fullname must include first and last names"
        })
})

const updateUserDto = createUserDto.partial()

type CreateUserType = z.infer<typeof createUserDto>
type UpdateUserType = z.infer<typeof updateUserDto>

export {createUserDto, updateUserDto}

export type {CreateUserType, UpdateUserType}