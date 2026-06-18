#!/usr/bin/env node

import { Command } from "commander";
import { readFile, writeFile } from "./utils/utils.js";
import chalk from "chalk";


const program = new Command()

program
    .name("Expense Tracker")
    .description("This tool helps manage and track expenses")
    .version("1.0.7")


program
    .command("add")
    .description("create a new expense")
    .argument("<category>")
    .argument("<price>")
    .action( async (category, price) => {
        const numberPrice = Number(price)
        
        if(isNaN(numberPrice) || numberPrice < 10){
            console.log(chalk.red("Price must be a number and not less than 10"))
            return
        }

        const expenseList = await readFile("expenses.json", true)
        const lastId = expenseList[expenseList.length - 1]?.id || 0

        const newExpense = {
            id: lastId + 1,
            category: category,
            price: numberPrice,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
            }
            expenseList.push(newExpense)
            await writeFile("expenses.json", expenseList)
            console.log(chalk.green("Expense added successfully"))
    })


program
    .command("show")
    .description("get the expenses list")
    .option("-a --asc", "sort the list ascending by expense created date")
    .option("-d --desc", "sort the list descending by expense created date")
    .option("-c --category <desiredCategory>", "filter the list by category")
    .option("-p --page <page>", "desired page", 1)
    .option("-t --take <take>", "desired page", 10)
    .action( async (opts) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }
        let result = expenseList

        if(opts.category){
            result = result.filter((expense) => expense.category === opts.category)
        }

        if (opts.asc){
            result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (opts.desc){
            result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }

        if(result.length < 1){
            console.log(chalk.red("No expenses found"))
            return
        }

        const page = Math.max(Number(opts.page) || 1, 1)
        const take = Math.max(Math.min(Number(opts.take) || 10, 10), 1)
        const totalPages = Math.ceil(result.length / take || 1)

        if(page > totalPages){
            console.log(`There are only ${chalk.blue(totalPages)} pages`)
            return
        }

        result = result.slice((page - 1) * take, page * take)
        console.log(result)
        console.log(`Showing page ${chalk.green(page)} out of ${chalk.green(totalPages)}`)
    })

program
    .command("search")
    .description("search expenses by date")
    .argument("<date>", "desired date, format:YYYY/MM/DD")
    .option("-p --page <page>", "desired page", 1)
    .option("-t --take <take>", "desired page", 10)
    .action(async (date, opts) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }
        let dateFiltered = expenseList.filter((expense) => expense.createdAt.startsWith(date))
        
        const page = Math.max(Number(opts.page) || 1, 1)
        const take = Math.max(Math.min(Number(opts.take) || 10, 10), 1)
        const totalPages = Math.ceil(dateFiltered.length / take || 1)

        if(dateFiltered.length < 1){
            console.log(`${chalk.red("No expenses found for date:")} ${chalk.underline.red(date)}`)
            return
        }

        if(page > totalPages){
            console.log(`There are only ${chalk.blue(totalPages)} pages`)
            return
        }

        dateFiltered = dateFiltered.slice((page - 1) * take, page * take)
        console.log(dateFiltered)
        console.log(`Showing all expenses of the date: ${chalk.blue(date)}`)
        console.log(`Showing page ${chalk.green(page)} out of ${chalk.green(totalPages)}`)
    })


program
    .command("update")
    .description("update expense data")
    .argument("<expenseId>")
    .option("-p --price <newPriceValue>", "updated price")
    .option("-c --category <newCategory>", "corrected category")
    .action( async (expenseId, opts) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }
        const expenseToUpdate = expenseList.find((expense) => expense.id === Number(expenseId))
        const numberPrice = Number(opts.price)

        if(!expenseToUpdate){
            console.log(chalk.red("Expense not found"))
            return
        }

        if(!opts.price && !opts.category){
            console.log(chalk.red("No changes made"))
            return
        }
        
        let isCorrectCategory = false
        let isCorrectPrice = true

        if (opts.price){
            if(isNaN(numberPrice) || numberPrice < 10){
                console.log(chalk.red("Price must be a number and not less than 10"))
                isCorrectPrice = false
            } else{
                expenseToUpdate.price = numberPrice
                isCorrectPrice = true
            }
        }

        if (opts.category){
            expenseToUpdate.category = opts.category
            isCorrectCategory = true
        }
        
        if(isCorrectCategory === true && isCorrectPrice === false){
            expenseToUpdate.lastUpdated = new Date().toISOString()
            await writeFile("expenses.json", expenseList)
            console.log(chalk.green("Expense category updated successfully"))
        }else if(isCorrectCategory === true || isCorrectPrice === true){
            expenseToUpdate.lastUpdated = new Date().toISOString()
            await writeFile("expenses.json", expenseList)
            console.log(chalk.green("Expense updated successfully"))
        }else{
            console.log(chalk.red("No changes made"))
        }
    })

program
    .command("delete")
    .description("delete expense")
    .argument("<expenseId>")
    .action(async (expenseId) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }

        const expenseToDelete = expenseList.findIndex((expense) => expense.id === Number(expenseId))
        if(expenseToDelete === -1){
            console.log(chalk.red("Expense not found"))
            return
        }

        expenseList.splice(expenseToDelete, 1)
        await writeFile("expenses.json", expenseList)
        console.log(chalk.green("Expense deleted successfully"))
    })


program
    .command("sum")
    .description("calculate prices of all expenses")
    .option("-d --date <date>", "to calculate particular date's expenses, format:YYYY/MM/DD")
    .action(async (opts) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }

        if(!opts.date){
            const totalSum = expenseList.reduce((tot, curr) => tot + curr.price, 0)
            console.log(`Total Sum: ${chalk.green.bold(totalSum)}`)
        } else {
            const dateFiltered = expenseList.filter((expense) => expense.createdAt.startsWith(opts.date))
            if(dateFiltered.length < 1){
                return console.log(`${chalk.red("No expenses found for date:")} ${chalk.underline.red(opts.date)}`)
            } else{
                const dateSum = dateFiltered.reduce((tot, curr) => tot + curr.price, 0)
                console.log(`Sum of ${opts.date}: ${chalk.green.bold(dateSum)}`)
            }
        }
    })

program
    .command("get")
    .description("get expense by id")
    .argument("<expenseId>", "desired expense id")
    .action( async (expenseId) => {
        const expenseList = await readFile("expenses.json", true)
        if(expenseList.length < 1){
            return console.log(chalk.red("The list is empty"))
        }

        const targetedExpense = expenseList.find((expense) => expense.id === Number(expenseId))
        const lastId = expenseList[expenseList.length - 1]?.id || 0

        if(!targetedExpense){
            return console.log(`${chalk.red("Invalid ID -")} The highest number of id in the list is ${chalk.blue(lastId)}`)
        }
        const desiredExpense = {
            id: targetedExpense.id,
            category: targetedExpense.category,
            price: targetedExpense.price
        }
        console.log(desiredExpense)
    })


program.parse()