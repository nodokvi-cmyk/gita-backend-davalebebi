import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";


@Controller("expenses")
export class ExpenseController{
    constructor(private readonly expenseService: ExpenseService){}

    @Get()
    getAllExpenses(){
        return this.expenseService.getAllExpenses()
    }

    @Get(":expenseId")
    getExpenseById(
        @Param("expenseId") expenseId: string
    ){
        return this.expenseService.getExpenseById(Number(expenseId))
    }

    @Post()
    createExpense(
        @Body() createExpenseDto: CreateExpenseDto
    ){
        if(
            !createExpenseDto.category ||
            !createExpenseDto.price ||
            !createExpenseDto.productName ||
            !createExpenseDto.quantity 
        ){
            throw new HttpException("Fill in the required fields: category, price, productName and quantity", HttpStatus.BAD_REQUEST)
        }
        return this.expenseService.createExpense(createExpenseDto)
    }

    @Delete(":expenseId")
    deleteExpenseById(
        @Param("expenseId") expenseId: string
    ){
        return this.expenseService.deleteExpenseById(Number(expenseId))
    }

    @Patch(":expenseId")
    updateExpenseById(
        @Param("expenseId") expenseId: string,
        @Body() updateExpenseDto: UpdateExpenseDto
    ){
        return this.expenseService.updateExpenseById(Number(expenseId), updateExpenseDto)
    }
}