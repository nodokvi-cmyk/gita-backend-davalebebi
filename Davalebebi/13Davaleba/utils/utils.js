const fs = require("fs/promises")

async function readFile(filePath, isParse){
    try{
    const readData = await fs.readFile(filePath, "utf8")
    return isParse ? JSON.parse(readData) : readData
    } catch (e) {
        if (e.code === "ENOENT"){
            const arrayBody = []
            await writeFile(filePath, arrayBody)
            return isParse ? arrayBody : JSON.stringify(arrayBody)
        }
    }
}


async function writeFile(filePath, data){
    if(!filePath) return console.log("File not provided")
    
    await fs.writeFile(filePath, typeof data === "string" ? data : JSON.stringify(data))

    // console.log("Written successfully")
}

module.exports = {readFile,writeFile}