import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { Model } from 'mongoose';
import { Post } from '../posts/schema/post.schema.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<User>,
        @InjectModel(Post.name) private postModel: Model<Post>,
    ){}

    getAll(){
        return this.usersModel.find().populate({path: "posts", select: "-author"})
    }

    // async createUser(createUserInput: CreateUserInput){
    //     const existingUser = await this.usersModel.findOne({email: createUserInput.email})
    //     if(existingUser) throw new BadRequestException("This email is already used")

    //     const newUser = await this.usersModel.create(createUserInput)
    //     return newUser
    // }

    async removeUser(userId: string){
        const user = await this.usersModel.findById(userId)
        if(!user) throw new NotFoundException("User not found")

        await this.usersModel.findByIdAndDelete(userId)
        await this.postModel.deleteMany({author: userId})

        return user
    }
}
