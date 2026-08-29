import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IUser } from "./user.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { QueryParamsDto, } from "./dtos/query-params.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schema/user.schema";
import { ProductsService } from "../products/products.service";
import * as bcrypt from "bcrypt"
import { ExpenseService } from "../expenses/expense.service";
import { faker } from '@faker-js/faker';


@Injectable()
export class UserService {
    constructor(
        @InjectModel("user") private userModel: Model<User>,
        @Inject(forwardRef(() => ExpenseService))
        private expenseService: ExpenseService
        // @Inject(forwardRef(() => ProductsService))
        // private productsService: ProductsService
    ){}

    async getStats(){
        const resp = await this.userModel.aggregate([
            {$group: {
                _id: "$gender",
                averageAge: {$avg: "$age"}
            }},
            {$project: {
                _id: 0,
                gender: "$_id",
                averageAge: 1
            }},
            {$sort: {averageAge: 1}},
            {$limit: 10}
        ])
        return resp
    }

    async onModuleInit(){
        // await this.userModel.updateMany(
        //     {},
        //     [
        //         {
        //             $set: {
        //                 isActive: { $gte: [{ $rand: {} }, 0.5] }
        //             }
        //         }
        //     ],
        //     {updatePipeline: true}
        // )

        // const userCount = await this.userModel.countDocuments()
        // if(userCount === 0){
        //     const dataToInsert: any = []
        //     console.log("Seeding start")
        //     for(let i = 0; i < 1_000; i++){
        //         dataToInsert.push({
        //             firstName: faker.person.firstName(),
        //             lastName: faker.person.lastName(),
        //             email: faker.internet.email(),
        //             gender: faker.helpers.arrayElement(["m", "f"]),
        //             age: faker.number.int({min: 10, max: 85}),
        //             isActive: true
        //         })
        //     }
        //     await this.userModel.insertMany(dataToInsert)
        //     console.log("Seeding finished")
        // }
    }

    async addExpenseToUser(userId: string | Types.ObjectId, expenseId: string | Types.ObjectId){
        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $push: {ownedExpenses: expenseId}
            }
        )
    }

    async removeExpenseFromUser(userId: string | Types.ObjectId, expenseId: string | Types.ObjectId){
        await this.userModel.findByIdAndUpdate(
            userId,
            {
                $pull: {ownedExpenses: expenseId}
            }
        )
    }

    // async upgradeSubscription(userId: string){
    //     if(!userId){
    //         throw new UnauthorizedException("No permission")
    //     }

    //     // const user = await this.findByEmail(email)
    //     const user = await this.userModel.findById(userId)
    //     if(!user){
    //         throw new UnauthorizedException("Unauthorized")
    //     }

    //     const now = new Date()
    //     const hasSubscription = new Date(user.subscriptionEndDate) > now 
        
    //     const targetDate = hasSubscription ? new Date(user.subscriptionEndDate) : new Date()

    //     targetDate.setMonth(targetDate.getMonth() + 1)

    //     user.subscriptionEndDate = targetDate

    //     await user.save()

    //     return {message: "Subscription upgraded successfully", updatedDate: user.subscriptionEndDate}
    // }

    async findByEmail(email: string){
        return await this.userModel.findOne({email: email})
    }

    async findAll({page = 1, take = 10}: QueryParamsDto){

        const resp = await this.userModel
                                .find()
                                .skip((page - 1) * take)
                                .limit(take)

        return resp
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

        // const filter: {
        //     gender?: string
        //     email?: RegExp
        // } = {}

        // if(gender){
        //     filter.gender = gender
        // }
        // if(email){
        //     filter.email = new RegExp(`^${email}`, 'i');
        // }

        // const skip = (page - 1) * take

        // const users = await this.userModel
        // .find(filter)
        // .skip(skip)
        // .limit(take)

        // return users
    }

    async findOne(id: string){
        const desiredUser = await this.userModel.findById(id)  //.populate({path: "orderedProducts", select: "name price quantity totalPrice -_id"})
        if (!desiredUser){
            throw new NotFoundException("User not found")
        }
        return desiredUser
    }

    async create(createUserDto: CreateUserDto){

        const existingUser = await this.userModel.findOne({email: createUserDto.email})
        if(existingUser){
            throw new BadRequestException("Email already used")
        }

        // const startingDate = new Date()
        // const endingDate = new Date(startingDate)

        // endingDate.setMonth(endingDate.getMonth() + 1)

        const newUser = await this.userModel.create(createUserDto)
            // subscriptionStartDate: startingDate,
            // subscriptionEndDate: endingDate
        
        return newUser
    }

    async remove(id: string){
        const user = await this.userModel.findByIdAndDelete(id)
        if(!user){
            throw new NotFoundException("User not found")
        }
        await this.expenseService.removeExpensesAfterUserDeleted(id)
        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        if(updateUserDto.email){
            const existingUser = await this.userModel.findOne({email: updateUserDto.email})
            if(existingUser){
                throw new BadRequestException("Email already used")
            }
        }
        
        // if(updateUserDto.password){
        //     updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
        // }

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