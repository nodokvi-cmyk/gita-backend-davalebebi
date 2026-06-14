#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import axios from "axios";

const program = new Command()

program
    .name('Weather CLI')
    .description('Get Weather Info')
    .version('1.3.0')
    .argument("<cityName>")
    .action( async (cityName) => {
        try{
            const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`)
            const temp = weather.data.main.temp

            console.log(`
City: ${chalk.cyan(weather.data.name)}
Temperature: ${temp > 25 ? chalk.redBright(`${temp} °C (High UV Exposure)`) : chalk.yellow(`${temp} °C`)}
Cloudiness: ${weather.data.weather[0].main}
Feels Like: ${chalk.yellow(`${weather.data.main.feels_like} °C`)}
Humidity: ${chalk.blue(`${weather.data.main.humidity}`)}
Wind Speed: ${chalk.white(`${weather.data.wind.speed}`)}
`)

        } catch {
            console.log(chalk.red.underline("Invalid City Name"))
        }
    })


program.parse()