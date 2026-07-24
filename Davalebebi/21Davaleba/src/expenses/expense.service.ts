import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IExpense } from "./expense.interface";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";


@Injectable()
export class ExpenseService {
    private expenseList = [
        { id: 1, category: "Shopping", productName: "Iphone 17 Pro Max", quantity: 1, price: 4000, totalPrice: 4000 },
        { id: 2, category: "Food", productName: "Pizza", quantity: 2, price: 25, totalPrice: 50 },
        { id: 3, category: "Gym", productName: "Monthly Membership", quantity: 1, price: 150, totalPrice: 150 },
        { id: 4, category: "Travel", productName: "Flight Ticket", quantity: 3, price: 800, totalPrice: 2400 },
        { id: 5, category: "Shopping", productName: "Running Shoes", quantity: 2, price: 250, totalPrice: 500 },
        { id: 6, category: "Food", productName: "Groceries", quantity: 4, price: 30, totalPrice: 120 }
    ]

    getAllExpenses(): IExpense[] {
        return this.expenseList
    }

    getExpenseById(expenseId: number): IExpense{
        const desiredExpense = this.expenseList.find((expense) => expense.id === expenseId)
        if(!desiredExpense){
            throw new HttpException("Expense not found", HttpStatus.NOT_FOUND)
        }
        return desiredExpense
    }

    createExpense(createExpenseDto: CreateExpenseDto): IExpense {
        const lastId = this.expenseList[this.expenseList.length - 1]?.id || 0
        const newExpense = {
            id: lastId + 1,
            ...createExpenseDto,
            totalPrice: createExpenseDto.price * createExpenseDto.quantity
        }
        this.expenseList.push(newExpense)
        return newExpense
    }

    deleteExpenseById(expenseId: number): IExpense{
        const targettedExpenseIndex = this.expenseList.findIndex((expense) => expense.id === expenseId)
        if(targettedExpenseIndex === -1){
            throw new HttpException("Expense not found", HttpStatus.NOT_FOUND)
        }
        const deletedExpense = this.expenseList.splice(targettedExpenseIndex, 1)
        return deletedExpense[0]
    }

    updateExpenseById(expenseId: number, updateExpenseDto: UpdateExpenseDto): IExpense {
        const targettedExpenseIndex = this.expenseList.findIndex((expense) => expense.id === expenseId)
        if(targettedExpenseIndex === -1){
            throw new HttpException("Expense not found", HttpStatus.NOT_FOUND)
        }
        const updatedExpense = {
            ...this.expenseList[targettedExpenseIndex],
            ...updateExpenseDto
        }
        updatedExpense.totalPrice = updatedExpense.price * updatedExpense.quantity

        this.expenseList[targettedExpenseIndex] = updatedExpense

        return this.expenseList[targettedExpenseIndex]
    }
}