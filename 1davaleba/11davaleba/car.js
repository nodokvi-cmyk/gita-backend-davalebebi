
const fs = require("fs/promises")

// Task 3) carList cli - add, show by desired filter (color or release date)

const [, , carName, carReleaseDate, carColor] = process.argv

async function carList(){
    if (carName !== "show"){
        const data = await fs.readFile("cars.json")
        const parseData = data.length > 0 ? JSON.parse(data) : []
        parseData.push({
            carName: carName,
            carReleaseDate: carReleaseDate,
            carColor: carColor,
        })
        await fs.writeFile("cars.json", JSON.stringify(parseData, null, 2))
    }
    if (carName === "show"){
        const data = await fs.readFile("cars.json", "utf8")
        const parseData = data.length > 0 ? JSON.parse(data) : []
        const filteredData = parseData.filter((car) => car.carReleaseDate === carReleaseDate || car.carColor.toLowerCase() === carReleaseDate.toLowerCase())
        console.log(filteredData)
    }
}

carList()