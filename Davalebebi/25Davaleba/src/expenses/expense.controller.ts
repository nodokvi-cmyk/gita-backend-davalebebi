import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { PaginationDto } from "../common/pagination.dto";
import { ExpenseQueryDto } from "./dtos/expense-query.dto";
import { IsValidMongoId } from "../common/is-valid-object-id.dto";


@Controller("expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService){}

    @Get()
    getAllExpenses(
        @Query() expenseQueryDto: ExpenseQueryDto
    ){
        return this.expenseService.getAllExpenses(expenseQueryDto)
    }

    @Get(":id")
    getExpenseById(
        @Param() {id}: IsValidMongoId,
    ){
        return this.expenseService.getExpenseById(id)
    }

    @Post()
    createExpense(
        @Body() createExpenseDto: CreateExpenseDto
    ){
        // if(
        //     !createExpenseDto.category ||
        //     !createExpenseDto.price ||
        //     !createExpenseDto.productName ||
        //     !createExpenseDto.quantity 
        // ){
        //     throw new HttpException("Fill in the required fields: category, price, productName and quantity", HttpStatus.BAD_REQUEST)
        // }
        return this.expenseService.createExpense(createExpenseDto)
    }

    @Delete(":id")
    deleteExpenseById(
        @Param() {id}: IsValidMongoId,
    ){
        return this.expenseService.deleteExpenseById(id)
    }

    @Patch(":id")
    updateExpenseById(
        @Param() {id}: IsValidMongoId,
        @Body() updateExpenseDto: UpdateExpenseDto
    ){
        return this.expenseService.updateExpenseById(id, updateExpenseDto)
    }
}