import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { Model } from 'mongoose';
import { Post } from '../posts/schema/post.schema.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<User>,
        @InjectModel(Post.name) private postModel: Model<Post>,
    ){}

    getAll(){
        return this.usersModel.find().populate({path: "posts", select: "-author"})
    }

    async getOne(id: string){
        const user = await this.usersModel.findById(id).populate({path: "posts", select: "-author"})
        if(!user) throw new NotFoundException("User not found")

        return user
    }

    async updateUser(userId: string, updateUserInput: UpdateUserInput){
        const existingUser = await this.usersModel.findById(userId)
        if(!existingUser) throw new NotFoundException("User not found")

        if(updateUserInput.email && updateUserInput.email !== existingUser.email){
            const emailAlreadyUser = await this.usersModel.findOne({email: updateUserInput.email})
            if(emailAlreadyUser) throw new BadRequestException("Email already used")
        }

        if(updateUserInput.password) {
            updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10)
        }
        
        const updatedUser = await this.usersModel.findByIdAndUpdate(userId, {
            ...updateUserInput,
            $inc: {__v: 1}
        }, {new: true}).populate({path: "posts", select: "-author"})

        return updatedUser
    }

    async removeUser(userId: string){
        const user = await this.usersModel.findById(userId)
        if(!user) throw new NotFoundException("User not found")

        await this.usersModel.findByIdAndDelete(userId)
        await this.postModel.deleteMany({author: userId})

        return user
    }
}
