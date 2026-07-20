import mongoose, { Types } from "mongoose"

export type UserType = {
    _id?: Types.ObjectId,
    fullName: string,
    email: string,
    score: number,
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
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

const userModel = mongoose.model<UserType>("user", userSchema)
export default userModel