#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "./utils/readfile.js";
import { writeFile } from "./utils/writefile.js";
import chalk from "chalk";

const program = new Command()

program
    .name('ToDo CLI')
    .description('Manage Tasks')
    .version('1.2.2')

program
    .command("show")
    .description("shows the full to-do list")
    .action( async () => {
        const todoList = await readFile("todo.json", true)
        console.log(todoList)
    })

program
    .command("add")
    .description("this command adds a new to-do task in the to-do list")
    .argument("<todoName>")
    .action(async (todoName) => {
        const todoList = await readFile("todo.json", true)
        const lastId = todoList[todoList.length - 1]?.id || 0

        const newTodo = {
            id: lastId + 1,
            title: todoName,
            isDone: false,
            "created at": new Date().toISOString(),
            "last updated":new Date().toISOString()
        }
        todoList.push(newTodo)
        await writeFile("todo.json", todoList)
        console.log(`${chalk.blue(newTodo.title)} added successfully to the To-Do List`)
    })

program
    .command("delete")
    .description("this command deletes a task from to-do list")
    .argument("<todoId>")
    .action(async (todoId) => {
        const todoList = await readFile("todo.json", true)
        const targetedTodo = todoList.find((task) => task.id === Number(todoId))
        const updatedTodoList = todoList.filter((task) => task.id !== Number(todoId))
        await writeFile("todo.json", updatedTodoList)
        console.log(`${chalk.red(targetedTodo.title)} removed successfully from the To-Do List`)
    })

program
    .command("update")
    .description("this command changes task's title or progress status")
    .argument("<todoId>")
    .option("-n, --name <todoName>", "new task title")
    .option("-s, --status", "task done")
    .action( async (todoId, opts) => {
        const todoList = await readFile("todo.json", true)
        const targetedTodo = todoList.find((task) => task.id === Number(todoId))
        const oldName = targetedTodo.title

        if(opts.name){
            targetedTodo.title = opts.name
            console.log(`task ${chalk.yellow(targetedTodo.id)} title: ${chalk.underline(oldName)} - changed into -> ${chalk.blue.bold(targetedTodo.title)}`)
        }

        if(opts.status){
            targetedTodo.isDone = true
            console.log(`${chalk.green(targetedTodo.title)} is Done`)
        }

        if (opts.name || opts.status){
            targetedTodo["last updated"] = new Date().toISOString()
        }
        
        await writeFile("todo.json", todoList)
    })

program.parse()