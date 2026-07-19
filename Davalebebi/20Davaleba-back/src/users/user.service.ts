import mongoose, {UpdateQuery} from "mongoose";
import { CreateUserType, UpdateUserType } from "./dto/create-update-user.dto.js";
import userModel, { UserType } from "./user.model.js";


const getAllUsers = async (): Promise<UserType[]> => {
    const users = await userModel.find()
    return users
}

const createUser = async (body: CreateUserType) => {
    const newUser = await userModel.create(body)
    return newUser
}

const getUserById = async(id: string) => {
    const desiredUser = await userModel.findById(id)
    return desiredUser
}

const deleteUserById = async (id: string) => {
    const deletedUser = await userModel.findByIdAndDelete(id)
    return deletedUser
}

const updateUserbyId = async (id: string, body: UpdateUserType) => {
    const updatePayload: UpdateQuery<UserType> = {
        ...body,
        $inc: { __v: 1 }
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updatePayload, { new: true })
    return updatedUser
}

export default {getAllUsers, createUser, getUserById, deleteUserById, updateUserbyId}