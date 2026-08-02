import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { IExpense } from "./expense.interface";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { PaginationDto } from "../common/pagination.dto";
import { ExpenseQueryDto } from "./dtos/expense-query.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, type QueryFilter } from "mongoose";
import { Expense } from "./schema/expense.schema";


@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel("expense") private expenseModel: Model<Expense>
    ){}

    async getAllExpenses({page, take, category, priceFrom, priceTo}: ExpenseQueryDto){

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

    async createExpense(createExpenseDto: CreateExpenseDto){
        const newExpense = await this.expenseModel.create({
            ...createExpenseDto,
            totalPrice: createExpenseDto.price * createExpenseDto.quantity
        })
        return newExpense
    }

    async deleteExpenseById(id: string){
        const expense = await this.expenseModel.findByIdAndDelete(id)
        if(!expense){
            throw new NotFoundException("expense not found")
        }
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
        },
    {new: true})

        return updatedExpense
    }
}