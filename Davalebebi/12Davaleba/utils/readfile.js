import fs from "fs/promises"

export async function readFile(filePath, isParse){
    if(!filePath) return console.log("File not provided")
    
    const readData = await fs.readFile(filePath, "utf8")
    return isParse ? JSON.parse(readData) : readData
}