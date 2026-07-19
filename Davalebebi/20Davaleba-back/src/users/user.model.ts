import mongoose, { Types } from "mongoose"

export type UserType = {
    _id?: Types.ObjectId,
    fullName: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new mongoose.Schema<UserType>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
}, {timestamps: true})

const userModel = mongoose.model<UserType>("user", userSchema)
export default userModel