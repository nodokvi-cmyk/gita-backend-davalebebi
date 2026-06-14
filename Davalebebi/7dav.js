// 1) დავალება - არასწორი url-დან მონაცემის წამოღება და 5ჯერ retry

async function getData(){
    for (let i= 1; i <=5; i++){
        try{
    const resp = await fetch("https://jsonplaceholde.typicode.com")
    const data = await resp.json()
    console.log(data)
    return
    } catch(e){
        console.log("Mcdeloba" + " " + i)
        console.log(e)
    }
}
}

// getData()


// 2) დავალება - https://dummyjson.com/users   -   https://jsonplaceholder.typicode.com/users  - რომელიც დაასწრებს დალოგვას

async function fastestData(){
    const resolve = await Promise.any([
        fetch("https://dummyjson.com/users"),
        fetch("https://jsonplaceholder.typicode.com/users"),
    ])
    const result = await resolve.json()

    console.log(result)
    
}

// fastestData()

// 3) დავალება - https://dummyjson.com/products - გაფილტრვა - 10$ზე ძვირი პროდუქტები

// const productTitles = []

async function expensiveProducts(){
    const resp = await fetch("https://dummyjson.com/products")
    const data = await resp.json()

    const expensive = data.products.filter((product) => product.price > 10)
    // expensive.forEach((product) => {
    //     productTitles.push({
    //         name: product.title
    //     })
    // })

    // ან

    const titles = expensive.map((product) => {
        return product.title
    })

    console.log(expensive)
    // console.log(productTitles)
    console.log(titles)
}

// expensiveProducts()

// 4) დავალება - https://dummyjson.com/users - მხოლოდ იმ იუზერების სახელი, გვარი, მისამართი(ქალაქი), იმეილი და ტელეფონის ნომერი.
                                               // რომელთა პროცესიაც web developer-ია

async function getDevelopers(){
    const resp = await fetch("https://dummyjson.com/users")
    const data = await resp.json()
    // console.log(data)

    const developers = data.users.filter((user) => user.company.title.toLowerCase() === "Web Developer".toLowerCase())
    // console.log(developers)

    const infos = developers.map((developer) => {
        return {
        name: `${developer.firstName} ${developer.lastName}`,
        address: developer.address.city,
        email: developer.email,
        phoneNumber: developer.phone
        }
    })
    console.log(infos)
}

// getDevelopers()


// 5) დავალება - https://dummyjson.com/recipes, https://dummyjson.com/comments, 
              // https://dummyjson.com/todos, https://dummyjson.com/quotes
            //   ასინქრონულად უნდა გაეშვას ყველა და ყველას შედეგი დაილოგოს

async function getAllData(){
    console.time()
    const [resp1, resp2, resp3, resp4] = await Promise.all([
        fetch("https://dummyjson.com/recipes"),
        fetch("https://dummyjson.com/comments"),
        fetch("https://dummyjson.com/todos"),
        fetch("https://dummyjson.com/quotes"),
    ])
    const [data1, data2, data3, data4] = await Promise.all([
        resp1.json(),
        resp2.json(),
        resp3.json(),
        resp4.json(),
    ])

    console.log(data1)
    console.log(data2)
    console.log(data3)
    console.log(data4)
    // console.log(data1, data2, data3, data4)
    console.timeEnd()
}

// getAllData()