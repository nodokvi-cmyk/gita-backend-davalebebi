import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IExpense } from "./expense.interface";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { PaginationDto } from "../common/pagination.dto";
import { ExpenseQueryDto } from "./dtos/expense-query.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, type QueryFilter } from "mongoose";
import { Expense } from "./schema/expense.schema";
import { UserService } from "../users/user.service";
import { faker } from '@faker-js/faker';
import { KnownCategories } from "./enums/expense-category.enum";
import { User } from "../users/schema/user.schema";
import { QueryParamsDto } from "../users/dtos/query-params.dto";



@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel("expense") private expenseModel: Model<Expense>,
        @Inject(forwardRef(() => UserService))
        private usersService: UserService,
        @InjectModel("user") private userModel: Model<User>
    ){}

    // async onModuleInit(){
    //     const expenseCount = await this.expenseModel.countDocuments()
    //     if(expenseCount === 0){
    //         const users = await this.userModel.find({}, {_id : 1}).lean()

    //         const usersIds = users.map((u) => u._id)

    //         const dataToInsert: any = []
    //         console.log("Seeding start")
    //         for (let i = 0; i < 5000; i++){
    //             const quantity = faker.number.int({min: 1, max: 20})
    //             const price = faker.number.int({min: 1, max: 10000})
    //             const totalPrice = Number(quantity * price)

    //             dataToInsert.push({
    //                 category: faker.helpers.objectValue(KnownCategories),
    //                 productName: faker.commerce.productName(),
    //                 quantity,
    //                 price,
    //                 totalPrice,
    //                 spender: faker.helpers.arrayElement(usersIds)
    //             })
    //         }
    //         const migratedExpenses = await this.expenseModel.insertMany(dataToInsert)

    //         const expenseOwnersMap = new Map<string, Types.ObjectId[]>()

    //         for(const expense of migratedExpenses){
    //             const ownerIdtoStrings = expense.spender.toString()
    //             if(!expenseOwnersMap.has(ownerIdtoStrings)){
    //                 expenseOwnersMap.set(ownerIdtoStrings, [])
    //             }
    //             expenseOwnersMap.get(ownerIdtoStrings)!.push(expense._id as Types.ObjectId)
    //         }

    //         const userBulkOption = Array.from(expenseOwnersMap.entries()).map(([userId, expenseId]) => ({
    //             updateOne: {
    //                 filter: { _id: userId },
    //                 update: {
    //                     $push: { ownedExpenses: { $each: expenseId } }
    //                 }
    //             }
    //         }))
    //         await this.userModel.bulkWrite(userBulkOption)

    //         console.log("Seeding done")
    //     }
    // }

    async removeExpensesAfterUserDeleted(ownerId: string | Types.ObjectId){
        await this.expenseModel.deleteMany({spender: ownerId})
    }

    async getTopSpenders({page =1 , take = 10}: QueryParamsDto){
        const resp = await this.expenseModel.aggregate([
            {$group: {
                _id: "$spender",
                totalSpentByThisUser: {$sum: "$totalPrice"}
            }},
            {$sort: {totalSpentByThisUser: -1}},
            {$setWindowFields: {
                sortBy: {totalSpentByThisUser: -1},
                output : {
                    rank: {$denseRank: {}}
                }
            }},
            {$lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }},
            {$unwind: "$user"},
            {$project: {
                _id: 0,
                rank: 1,
                totalSpentByThisUser: 1,
                user: {
                    firstName: "$user.firstName",
                    lastName: "$user.lastName",
                    email: "$user.email"
                }
            }},
            {$skip: (page - 1) * take},
            {$limit: take}
        ])
        return resp
    }

    async getStatistics({page =1 , take = 10}: QueryParamsDto){
        const resp = await this.expenseModel.aggregate([
            {$group: {
                _id: "$category",
                totalExpenseSum: {$sum: "$totalPrice"},
                totalExpenseItems: {$sum: "$quantity"}
            }},
            {$sort: {totalExpenseSum: -1}},
            {$project: {
                _id: 0,
                category: "$_id",
                totalExpenseSum: 1,
                totalExpenseItems: 1
        }},
        
            {$skip: (page - 1) * take},
            {$limit: take}
        ])
        return resp
    }

    async getAllExpenses({page = 1, take = 10, category, priceFrom, priceTo}: ExpenseQueryDto){
        

        // const filteredExpenses = this.expenseList.filter((expense) => {
        //     if(!category && !priceFrom && !priceTo){
        //         return true
        //     }

        //     const correctCategory = category ? expense.category === category : true
        //     const correctPriceFrom = priceFrom ? expense.price >= priceFrom : true
        //     const correctPriceTo = priceTo ? expense.price <= priceTo : true

        //     return correctCategory && correctPriceFrom && correctPriceTo
        // })

        // const start = (page - 1) * take
        // const stop = page * take
        // return filteredExpenses.slice(start, stop)

        const filter: QueryFilter<Expense> = {}

        if(category){
            filter.category = category
        }
        
        if(priceFrom || priceTo){
            filter.price = {}
            if(priceFrom){
                filter.price.$gte = priceFrom
            }
            if(priceTo){
                filter.price.$lte = priceTo
            }
        }

        const skip = (page - 1) * take

        const expenses = await this.expenseModel
        .find(filter)
        .skip(skip)
        .limit(take)

        return expenses
    }

    async getExpenseById(id: string){
        const desiredExpense = await this.expenseModel.findById(id)
        if(!desiredExpense){
            throw new NotFoundException("expense not found")
        }
        return desiredExpense
    }

    async createExpense(createExpenseDto: CreateExpenseDto, userId){
        const newExpense = await this.expenseModel.create({
            ...createExpenseDto,
            totalPrice: createExpenseDto.price * createExpenseDto.quantity,
            spender: userId
        })

        await this.usersService.addExpenseToUser(newExpense.spender, newExpense._id)
        return newExpense
    }

    async deleteExpenseById(id: string){
        const expense = await this.expenseModel.findByIdAndDelete(id)
        if(!expense){
            throw new NotFoundException("expense not found")
        }

        await this.usersService.removeExpenseFromUser(expense.spender, expense._id)
        return expense
    }

    async updateExpenseById(id: string, updateExpenseDto: UpdateExpenseDto){
        const targettedExpense = await this.expenseModel.findById(id)
        if(!targettedExpense){
            throw new NotFoundException("expense not found")
        }

        const price = updateExpenseDto.price ?? targettedExpense.price
        const quantity = updateExpenseDto.quantity ?? targettedExpense.quantity
        const totalPrice = price * quantity

        const updatedExpense = await this.expenseModel.findByIdAndUpdate(id, {
            ...updateExpenseDto,
            totalPrice,
            $inc: { __v: 1 }
        },
    {new: true})

        return updatedExpense
    }
}