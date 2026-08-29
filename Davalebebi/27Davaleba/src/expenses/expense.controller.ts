import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { PaginationDto } from "../common/pagination.dto";
import { ExpenseQueryDto } from "./dtos/expense-query.dto";
import { IsValidMongoId } from "../common/is-valid-object-id.dto";
import { Throttle } from "@nestjs/throttler";
import { UserId } from "../users/decorators/user.decorator";
import { QueryParamsDto } from "../users/dtos/query-params.dto";


@Controller("expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService){}

    @Get()
    getAllExpenses(
        @Query() expenseQueryDto: ExpenseQueryDto
    ){
        return this.expenseService.getAllExpenses(expenseQueryDto)
    }

    @Get("top-spenders")
    getTopSpenders(
        @Query() queryParamsDto: QueryParamsDto
    ){
        return this.expenseService.getTopSpenders(queryParamsDto)
    }

    @Get("statistic")
    getStatistics(
        @Query() queryParamsDto: QueryParamsDto
    ){
        return this.expenseService.getStatistics(queryParamsDto)
    }

    @Get(":id")
    getExpenseById(
        @Param() {id}: IsValidMongoId,
    ){
        return this.expenseService.getExpenseById(id)
    }

    @Post()
    createExpense(
        @Body() createExpenseDto: CreateExpenseDto,
        @UserId() userId
    ){
        return this.expenseService.createExpense(createExpenseDto, userId)
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