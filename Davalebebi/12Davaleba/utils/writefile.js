import fs from "fs/promises"

export async function writeFile(filePath, data){
    if(!filePath) return console.log("File not provided")
    
    await fs.writeFile(filePath, typeof data === "string" ? data : JSON.stringify(data))

    // console.log("Written successfully")
}