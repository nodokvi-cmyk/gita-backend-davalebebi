import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IUser } from "./user.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { UserQueryDto } from "./dtos/user-query.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schema/user.schema";
import { ProductsService } from "../products/products.service";
import * as bcrypt from "bcrypt"


@Injectable()
export class UserService {
    constructor(
        @InjectModel("user") private userModel: Model<User>,
        @Inject(forwardRef(() => ProductsService))
        private productsService: ProductsService
    ){}

    async addProductToUser(userId: string | Types.ObjectId, productId: string | Types.ObjectId){
        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $push: {orderedProducts: productId}
            }
        )
    }

    async removeProductFromUser(userId: string | Types.ObjectId, productId: string | Types.ObjectId){
        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $pull: {orderedProducts: productId}
            }
        )
    }

    async upgradeSubscription(userId: string){
        if(!userId){
            throw new UnauthorizedException("No permission")
        }

        // const user = await this.findByEmail(email)
        const user = await this.userModel.findById(userId)
        if(!user){
            throw new UnauthorizedException("Unauthorized")
        }

        const now = new Date()
        const hasSubscription = new Date(user.subscriptionEndDate) > now 
        
        const targetDate = hasSubscription ? new Date(user.subscriptionEndDate) : new Date()

        targetDate.setMonth(targetDate.getMonth() + 1)

        user.subscriptionEndDate = targetDate

        await user.save()

        return {message: "Subscription upgraded successfully", updatedDate: user.subscriptionEndDate}
    }

    async findByEmail(email: string){
        return await this.userModel.findOne({email: email})
    }

    async getAllUser({page, take, gender, email}: UserQueryDto){

        // const filteredUserList = await this.userModel.find()
        // filteredUserList.filter((user) => {
        //     if(!gender && !email){
        //         return true
        //     }

        //     const correctGender = gender ? user.gender === gender : true
        //     const correctEmail = email ? user.email.toLowerCase().startsWith(email.toLowerCase()) : true

        //     return correctGender && correctEmail
        // })

        // const start = (page - 1) * take
        // const stop = page * take
        // return filteredUserList.slice(start, stop)

        const filter: {
            gender?: string
            email?: RegExp
        } = {}

        if(gender){
            filter.gender = gender
        }
        if(email){
            filter.email = new RegExp(`^${email}`, 'i');
        }

        const skip = (page - 1) * take

        const users = await this.userModel
        .find(filter)
        .skip(skip)
        .limit(take)

        return users
    }

    async getUserById(id: string){
        const desiredUser = await this.userModel.findById(id).populate({path: "orderedProducts", select: "name price quantity totalPrice -_id"})
        if (!desiredUser){
            throw new NotFoundException("User not found")
        }
        return desiredUser
    }

    async createUser(createUserDto: CreateUserDto){

        const existingUser = await this.userModel.findOne({email: createUserDto.email})
        if(existingUser){
            throw new BadRequestException("Email already used")
        }

        const startingDate = new Date()
        const endingDate = new Date(startingDate)

        endingDate.setMonth(endingDate.getMonth() + 1)

        const newUser = await this.userModel.create({
            ...createUserDto,
            subscriptionStartDate: startingDate,
            subscriptionEndDate: endingDate
        })
        
        return newUser
    }

    async deleteUserById(id: string){
        const user = await this.userModel.findByIdAndDelete(id)
        if(!user){
            throw new NotFoundException("User not found")
        }
        await this.productsService.removeProductsAfterUserDeleted(id)
        return user
    }

    async updateUserById(id: string, updateUserDto: UpdateUserDto){
        const existingUser = await this.userModel.findOne({email: updateUserDto.email})
        if(existingUser){
            throw new BadRequestException("Email already used")
        }
        
        if(updateUserDto.password){
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(id, {
            ...updateUserDto,
        $inc: { __v: 1 } },
            {new: true}
        )
        if(!updatedUser){
            throw new NotFoundException("User not found")
        }

        return updatedUser
    }
}