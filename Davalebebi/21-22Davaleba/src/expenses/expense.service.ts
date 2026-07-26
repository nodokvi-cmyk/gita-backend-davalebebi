import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IExpense } from "./expense.interface";
import { CreateExpenseDto } from "./dtos/create-expense.dto";
import { UpdateExpenseDto } from "./dtos/update-expense.dto";
import { PaginationDto } from "../common/pagination.dto";
import { ExpenseQueryDto } from "./dtos/expense-query.dto";


@Injectable()
export class ExpenseService {
    private expenseList = [
        { id: 1, category: "shopping", productName: "Iphone 17 Pro Max", quantity: 1, price: 4000, totalPrice: 4000 },
        { id: 2, category: "food", productName: "Pizza", quantity: 2, price: 25, totalPrice: 50 },
        { id: 3, category: "gym", productName: "Monthly Membership", quantity: 1, price: 150, totalPrice: 150 },
        { id: 4, category: "travel", productName: "Flight Ticket", quantity: 3, price: 800, totalPrice: 2400 },
        { id: 5, category: "shopping", productName: "Running Shoes", quantity: 2, price: 250, totalPrice: 500 },
        { id: 6, category: "food", productName: "Groceries", quantity: 4, price: 30, totalPrice: 120 },
        { id: 7, category: "travel", productName: "Hotel Booking", quantity: 2, price: 220, totalPrice: 440 },
        { id: 8, category: "gym", productName: "Protein Powder", quantity: 2, price: 110, totalPrice: 220 },
        { id: 9, category: "food", productName: "Coffee & Pastry", quantity: 5, price: 12, totalPrice: 60 },
        { id: 10, category: "shopping", productName: "Mechanical Keyboard", quantity: 1, price: 350, totalPrice: 350 },
        { id: 11, category: "gym", productName: "Personal Trainer Session", quantity: 4, price: 50, totalPrice: 200 },
        { id: 12, category: "travel", productName: "Train Ticket", quantity: 2, price: 65, totalPrice: 130 },
        { id: 13, category: "food", productName: "Sushi Dinner", quantity: 1, price: 95, totalPrice: 95 },
        { id: 14, category: "shopping", productName: "Wireless Earbuds", quantity: 1, price: 280, totalPrice: 280 },
        { id: 15, category: "gym", productName: "Creatine Monohydrate", quantity: 1, price: 45, totalPrice: 45 },
        { id: 16, category: "travel", productName: "Car Rental", quantity: 3, price: 90, totalPrice: 270 },
        { id: 17, category: "food", productName: "Burger Combo", quantity: 3, price: 18, totalPrice: 54 },
        { id: 18, category: "shopping", productName: "Winter Jacket", quantity: 1, price: 450, totalPrice: 450 },
        { id: 19, category: "gym", productName: "Workout Gloves", quantity: 1, price: 25, totalPrice: 25 },
        { id: 20, category: "travel", productName: "Airport Express Ticket", quantity: 2, price: 30, totalPrice: 60 },
        { id: 21, category: "food", productName: "Bakery Snacks", quantity: 6, price: 8, totalPrice: 48 },
        { id: 22, category: "shopping", productName: "Leather Belt", quantity: 1, price: 85, totalPrice: 85 },
        { id: 23, category: "gym", productName: "Resistance Bands", quantity: 1, price: 30, totalPrice: 30 },
        { id: 24, category: "travel", productName: "Museum Tour", quantity: 2, price: 25, totalPrice: 50 },
        { id: 25, category: "food", productName: "Steakhouse Dinner", quantity: 1, price: 160, totalPrice: 160 },
        { id: 26, category: "shopping", productName: "Desk Lamp", quantity: 1, price: 90, totalPrice: 90 },
        { id: 27, category: "gym", productName: "Yoga Mat", quantity: 1, price: 50, totalPrice: 50 },
        { id: 28, category: "travel", productName: "Souvenirs", quantity: 4, price: 18, totalPrice: 72 },
        { id: 29, category: "food", productName: "Ice Cream", quantity: 4, price: 6, totalPrice: 24 },
        { id: 30, category: "shopping", productName: "Backpack", quantity: 1, price: 140, totalPrice: 140 },
        { id: 31, category: "gym", productName: "Shaker Bottle", quantity: 2, price: 12, totalPrice: 24 },
        { id: 32, category: "travel", productName: "Travel Insurance", quantity: 1, price: 85, totalPrice: 85 },
        { id: 33, category: "food", productName: "Lunch Salad", quantity: 5, price: 14, totalPrice: 70 },
        { id: 34, category: "shopping", productName: "Sunglasses", quantity: 1, price: 210, totalPrice: 210 },
        { id: 35, category: "gym", productName: "Gym Short Pants", quantity: 2, price: 40, totalPrice: 80 },
        { id: 36, category: "travel", productName: "Guided City Tour", quantity: 1, price: 70, totalPrice: 70 },
        { id: 37, category: "food", productName: "Asian Food Delivery", quantity: 2, price: 35, totalPrice: 70 },
        { id: 38, category: "shopping", productName: "Smart Watch", quantity: 1, price: 380, totalPrice: 380 },
        { id: 39, category: "gym", productName: "L-Carnitine Supplement", quantity: 1, price: 35, totalPrice: 35 },
        { id: 40, category: "travel", productName: "Luggage Set", quantity: 1, price: 290, totalPrice: 290 },
        { id: 41, category: "food", productName: "Fresh Fruits", quantity: 3, price: 15, totalPrice: 45 },
        { id: 42, category: "shopping", productName: "Cotton T-Shirts", quantity: 3, price: 30, totalPrice: 90 },
        { id: 43, category: "gym", productName: "Lifting Straps", quantity: 1, price: 20, totalPrice: 20 },
        { id: 44, category: "travel", productName: "Resort Day Pass", quantity: 2, price: 110, totalPrice: 220 },
        { id: 45, category: "food", productName: "Seafood Platter", quantity: 1, price: 140, totalPrice: 140 },
        { id: 46, category: "shopping", productName: "Ergonomic Chair", quantity: 1, price: 520, totalPrice: 520 },
        { id: 47, category: "gym", productName: "BCAA Powder", quantity: 1, price: 40, totalPrice: 40 },
        { id: 48, category: "travel", productName: "Cruise Day Trip", quantity: 1, price: 350, totalPrice: 350 },
        { id: 49, category: "food", productName: "Italian Pasta", quantity: 2, price: 28, totalPrice: 56 },
        { id: 50, category: "shopping", productName: "Jeans", quantity: 2, price: 110, totalPrice: 220 },
        { id: 51, category: "gym", productName: "Crossfit Shoes", quantity: 1, price: 180, totalPrice: 180 },
        { id: 52, category: "travel", productName: "Hostel Stay", quantity: 3, price: 45, totalPrice: 135 },
        { id: 53, category: "food", productName: "Breakfast Buffet", quantity: 2, price: 32, totalPrice: 64 },
        { id: 54, category: "shopping", productName: "Monitor Stand", quantity: 1, price: 70, totalPrice: 70 },
        { id: 55, category: "gym", productName: "Jump Rope", quantity: 1, price: 15, totalPrice: 15 },
        { id: 56, category: "travel", productName: "Ferry Ticket", quantity: 2, price: 40, totalPrice: 80 },
        { id: 57, category: "food", productName: "Smoothie Bowl", quantity: 3, price: 11, totalPrice: 33 },
        { id: 58, category: "shopping", productName: "Wireless Mouse", quantity: 1, price: 95, totalPrice: 95 },
        { id: 59, category: "gym", productName: "Kettlebell 16kg", quantity: 1, price: 65, totalPrice: 65 },
        { id: 60, category: "travel", productName: "Excursion Pass", quantity: 1, price: 120, totalPrice: 120 },
        { id: 61, category: "food", productName: "BBQ Grill Pack", quantity: 1, price: 130, totalPrice: 130 },
        { id: 62, category: "shopping", productName: "Winter Socks", quantity: 5, price: 8, totalPrice: 40 },
        { id: 63, category: "gym", productName: "Gym Bag", quantity: 1, price: 75, totalPrice: 75 },
        { id: 64, category: "travel", productName: "International SIM Card", quantity: 1, price: 35, totalPrice: 35 },
        { id: 65, category: "food", productName: "Donuts", quantity: 2, price: 15, totalPrice: 30 },
        { id: 66, category: "shopping", productName: "Power Bank", quantity: 1, price: 60, totalPrice: 60 },
        { id: 67, category: "gym", productName: "Pre-Workout Powder", quantity: 1, price: 55, totalPrice: 55 },
        { id: 68, category: "travel", productName: "Ski Lift Pass", quantity: 1, price: 160, totalPrice: 160 },
        { id: 69, category: "food", productName: "Ramen Bowl", quantity: 2, price: 22, totalPrice: 44 },
        { id: 70, category: "shopping", productName: "Desk Mat", quantity: 1, price: 35, totalPrice: 35 },
        { id: 71, category: "gym", productName: "Foam Roller", quantity: 1, price: 30, totalPrice: 30 },
        { id: 72, category: "travel", productName: "Beach Sunbed Rental", quantity: 2, price: 20, totalPrice: 40 },
        { id: 73, category: "food", productName: "Sandwich Lunch", quantity: 4, price: 9, totalPrice: 36 },
        { id: 74, category: "shopping", productName: "USB-C Cable", quantity: 3, price: 15, totalPrice: 45 },
        { id: 75, category: "gym", productName: "Athletic Tank Top", quantity: 2, price: 30, totalPrice: 60 },
        { id: 76, category: "travel", productName: "Hop-on Hop-off Bus", quantity: 2, price: 45, totalPrice: 90 },
        { id: 77, category: "food", productName: "Chocolate Box", quantity: 1, price: 28, totalPrice: 28 },
        { id: 78, category: "shopping", productName: "Scented Candle", quantity: 2, price: 22, totalPrice: 44 },
        { id: 79, category: "gym", productName: "Gym Towel Set", quantity: 2, price: 18, totalPrice: 36 },
        { id: 80, category: "travel", productName: "Cable Car Ticket", quantity: 2, price: 25, totalPrice: 50 },
        { id: 81, category: "food", productName: "Taco Combo", quantity: 3, price: 16, totalPrice: 48 },
        { id: 82, category: "shopping", productName: "Bluetooth Speaker", quantity: 1, price: 130, totalPrice: 130 },
        { id: 83, category: "gym", productName: "Weightlifting Belt", quantity: 1, price: 85, totalPrice: 85 },
        { id: 84, category: "travel", productName: "National Park Pass", quantity: 1, price: 80, totalPrice: 80 },
        { id: 85, category: "food", productName: "Pancake Breakfast", quantity: 2, price: 24, totalPrice: 48 },
        { id: 86, category: "shopping", productName: "Laptop Sleeve", quantity: 1, price: 45, totalPrice: 45 },
        { id: 87, category: "gym", productName: "Hand Gripper Set", quantity: 1, price: 20, totalPrice: 20 },
        { id: 88, category: "travel", productName: "Camping Pitch Rental", quantity: 2, price: 35, totalPrice: 70 },
        { id: 89, category: "food", productName: "Falafel Wrap", quantity: 3, price: 10, totalPrice: 30 },
        { id: 90, category: "shopping", productName: "Thermal Flask", quantity: 1, price: 40, totalPrice: 40 },
        { id: 91, category: "gym", productName: "Electrolyte Drink Mix", quantity: 2, price: 25, totalPrice: 50 },
        { id: 92, category: "travel", productName: "Airport Lounge Pass", quantity: 1, price: 60, totalPrice: 60 },
        { id: 93, category: "food", productName: "Cheese Platter", quantity: 1, price: 75, totalPrice: 75 },
        { id: 94, category: "shopping", productName: "Casual Hoodie", quantity: 1, price: 120, totalPrice: 120 },
        { id: 95, category: "gym", productName: "Barbell Pad", quantity: 1, price: 22, totalPrice: 22 },
        { id: 96, category: "travel", productName: "Souvenir T-Shirt", quantity: 2, price: 25, totalPrice: 50 },
        { id: 97, category: "food", productName: "Fresh Juice", quantity: 4, price: 7, totalPrice: 28 },
        { id: 98, category: "shopping", productName: "Reading Glasses", quantity: 1, price: 65, totalPrice: 65 },
        { id: 99, category: "gym", productName: "Chalk Sphere", quantity: 2, price: 10, totalPrice: 20 },
        { id: 100, category: "travel", productName: "City Map & Guidebook", quantity: 1, price: 15, totalPrice: 15 }
    ]

    getAllExpenses({page, take, category, priceFrom, priceTo}: ExpenseQueryDto): IExpense[] {

        const filteredExpenses = this.expenseList.filter((expense) => {
            if(!category && !priceFrom && !priceTo){
                return true
            }

            const correctCategory = category ? expense.category === category : true
            const correctPriceFrom = priceFrom ? expense.price >= priceFrom : true
            const correctPriceTo = priceTo ? expense.price <= priceTo : true

            return correctCategory && correctPriceFrom && correctPriceTo
        })

        const start = (page - 1) * take
        const stop = page * take
        return filteredExpenses.slice(start, stop)
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