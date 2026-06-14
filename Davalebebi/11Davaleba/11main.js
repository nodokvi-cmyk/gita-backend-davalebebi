// Task 1) counting words and vowels recursively in every folder

const fs = require("fs/promises")

const path = require("path")

// console.log(__dirname)

let wordCount = 0
let vowelCount = 0


async function sentenceStats(fileName){
    const dirs = await fs.readdir(fileName)


    for (let dir of dirs){
        const eachItemPath = path.join(fileName, dir)
        const stat = await fs.stat(eachItemPath)
        if (stat.isDirectory()){
            await sentenceStats(eachItemPath)
        }

        const ext = path.extname(eachItemPath)
        if (ext === ".txt" && stat.isFile()){
            const data = await fs.readFile(eachItemPath, "utf8")
            const words = data.match(/[a-zA-Z0-9']+/g) || []; // regex by AI
            wordCount += words.length
            const vowels = data.match(/[aeiou]/gi) || []; // ai regex
            vowelCount += vowels.length
        }
    }
}


async function main(){
    await sentenceStats(__dirname)
    console.log(`word count: ${wordCount}`)
    console.log(`vowel count: ${vowelCount}`)
}

main()