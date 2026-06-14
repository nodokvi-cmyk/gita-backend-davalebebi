// 1) Mousemove log Debounce

window.addEventListener('mousemove', debounce((e) => {
    console.log(e.clientX, e.clientY)
}, 300))

function debounce(callback, ms){
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, ms)
    }
}

// 2) Generate random quote when clicking the button

const quoteBtn = document.querySelector("#quoteBtn")
const randomQuote = document.querySelector("#randomQuote")

quoteBtn.addEventListener("click", async () => {
    const resp = await fetch("https://dummyjson.com/quotes")
    const data = await resp.json()

    const randomQuoteId = Math.floor(Math.random() * data.quotes.length)

    randomQuote.textContent = `"${data.quotes[randomQuoteId].quote}" - ${data.quotes[randomQuoteId].author}`
    // randomQuote.innerHTML = `"${data.quotes[randomQuoteId].quote}" <br> -  ${data.quotes[randomQuoteId].author}`
}
)

// 3) 200 users, 30 users limit - https://dummyjson.com/users

const userContainer = document.querySelector("#userContainer")
const paginationContainer = document.querySelector("#paginationContainer")

async function getUsersList(page){

    const limit = 30 
    let skip = ((page - 1) * limit)
    
    const resp = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
    const data = await resp.json()

    getUsers(data.users)
}

function getUsers(users){
    userContainer.innerHTML = ""
    users.forEach((user) => {
        const userDiv = document.createElement("div")
        const userName = document.createElement("h1")
        const userEmail = document.createElement("h1")
        const userAge = document.createElement("h2")

        userName.textContent = `Name: ${user.firstName} ${user.lastName}`
        userEmail.textContent = `Email: ${user.email}`
        userAge.textContent = `Age: ${user.age}`

        userDiv.appendChild(userName)
        userDiv.appendChild(userEmail)
        userDiv.appendChild(userAge)

        userDiv.style.border = "2px solid black"

        userContainer.appendChild(userDiv)
    })
}

function paginationButtons(totalUser, limitPerPage){
    // paginationContainer.innerHTML = ""
    for (let i = 1; i <= Math.ceil(totalUser / limitPerPage); i++){
        const button = document.createElement("button")
        button.textContent = i
        button.addEventListener("click", () => {
            getUsersList(i)
        })
        paginationContainer.appendChild(button)
    }
}

getUsersList(1)
paginationButtons(200, 30)


// 4) https://myfakeapi.com/api/cars - car search by id. + error handle for incorrect input(>1000, total number of cars are 1000)

const carInput = document.querySelector("#getCar")
const carContainer = document.querySelector("#carInfo")


carInput.addEventListener("input", debounce ((e) => {
    if(e.target.value === "" || e.target.value === "0"){
        carContainer.innerHTML = ""
    }else if(e.target.value >= 1 && e.target.value <= 1000){
        getCarInfo(e.target.value)
    }else{
        alert("There are 1000 cars in total. Input must be between 1 and 1000.")
    }
}, 300))

async function getCarInfo(carId){
    carContainer.innerHTML = ""
    const resp = await fetch(`https://myfakeapi.com/api/cars/${carId}`)
    const data = await resp.json()

    const carDiv = document.createElement("div")
    const carName = document.createElement("h1")
    const carModel = document.createElement("h1")
    const carColor = document.createElement("h2")
    const carYear = document.createElement("h2")
    const carPrice = document.createElement("h2")
    const carAvailability = document.createElement("h3")
    
    carName.textContent = `Name: ${data.Car.car}`
    carModel.textContent = `Model: ${data.Car.car_model}`
    carColor.textContent = `Color: ${data.Car.car_color}`
    carYear.textContent = `Year: ${data.Car.car_model_year}`
    carPrice.textContent = `Price: ${data.Car.price}`
    carAvailability.textContent = `Available: ${data.Car.availability}`

    carDiv.appendChild(carName)
    carDiv.appendChild(carModel)
    carDiv.appendChild(carColor)
    carDiv.appendChild(carYear)
    carDiv.appendChild(carPrice)
    carDiv.appendChild(carAvailability)

    carDiv.style.border = "2px solid black"

    carContainer.appendChild(carDiv)
}