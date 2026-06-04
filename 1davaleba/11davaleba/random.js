
const fs = require("fs/promises")

// Task 4) count random sentence words, vowels and characters and push the results into -> result.json

const vowels = ["a", "e", "i", "o", "u"]

async function sentenceStat(fileName){
    try{
        const data = await fs.readFile(fileName, "utf8")
        const cleanData = data.trim()
        const words = cleanData === "" ? [] : cleanData.split(/\s+/)
        const characters = words.join("")
        let vowelCount = 0
        for (let i = 0; i < characters.length; i++){
            if (vowels.includes(characters[i].toLowerCase())){
                vowelCount++
            }
        }
        const result = {
            words: words.length,
            vowels: vowelCount,
            characters: characters.length,
        }
        await fs.writeFile("result.json", JSON.stringify(result, null, 2))
    } catch (e){
        if(e.code === "ENOENT"){
            console.log("Unknown file name")
        } else {
            console.log("Unknown error")
        }
    }
}

sentenceStat(process.argv[2])