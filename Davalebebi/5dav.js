// 1) ობიექტიდან ფროფერთის წამშლელი ფუნქცია
// 1.1)

function removeKey(object, key){
    delete object[key]
    return object
}

const bestStudent1 = {
    name: "Giorgi",
    age: 24,
    isSmoker: true,
    hobby: "football"
}

console.log(removeKey(bestStudent1, "age"), "1 Davaleba")


// 1.2) რამდენიმე თუ მინდა რო წამიშალოს

function removeKey1(object, ...keys){
    for (let key of keys){
        delete object[key]
    }
    return object
}

const bestStudent2 = {
    name: "Giorgi",
    age: 24,
    isSmoker: true,
    hobby: "football"
}

console.log(removeKey1(bestStudent2, "age", "hobby"), "1 Davaleba")


// 2) ranking ქულების მიხედვით

const students = [
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 }
]

function rankedStudents (array1){
    return array1.sort((a, b) => b.score - a.score).map((student, index) => ({...student, rank: index + 1}))
}

console.log(rankedStudents(students), "2 Davaleba")

// 3) ფუნქცია რომელიც ობიექტის იმ წევრს დააბრუნებს რომლის title-ც ყველაზე გრძელია

const movies = [
  { title: "Up", year: 2009 }, { title: "The Lord of the Rings", year: 2001 }
]

function getLongest(array2){
    const descending = array2.sort((a, b) => b.title.length - a.title.length)
    return descending[0]
}

console.log(getLongest(movies), "3 Davaleba")


// 4) დეპარტმენტის საშუალო ასაკი

const coworkers = [
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 },
]

function getDeptAverageAge(array3){
    const ages = {}
    const count = {}

    for (let coworker of array3){
        if (!ages[coworker.dept]){
            ages[coworker.dept] = coworker.age
            count[coworker.dept] = 1
        } else {
            ages[coworker.dept] += coworker.age
            count[coworker.dept]++
        }
    }
    // console.log(ages)
    // console.log(count)

    const result = {}

    for (let key in ages){
        result[key] = ages[key] / count[key]
    }
    return result
}


console.log(getDeptAverageAge(coworkers), "4 Davaleba")


// 5) მასივიდან ყველა კომენტარის სიტყვების რაოდენობა

const reviews = [
  { id:1, comment:"Hello world" }, 
  { id:2, comment:"This is great!" },
  { id:3, comment:"" },
  { id:4, comment:"Amazing      Movie" }, // ეს რო დავწერე შემოწმებისას edge case-დ მიკარნახა AI-მ, ჩემით ვერ გავასწორე შიდა 
                                          // სფეისების დათვლის პრობლემა
  { id:5, comment:" "},
  { id:6, comment:"Cool" },
]

function commentCount(array4){
    const wordList = []
    for (let user of array4){
        if (user.comment.trim() !== ""){
        wordList.push(user.comment)
        }
    }
    // console.log(wordList)
    const wordsOnly = []

    for (let i = 0; i < wordList.length; i++){
        const arrayMemberWords = (wordList[i].split(" "))
        // console.log(arrayMemberWords)

        for (let word of arrayMemberWords){
        if (word.trim() !== ""){  // ეს დამამატებინა AI_მ
            wordsOnly.push(word)
        }
    }}

    // console.log(wordsOnly)
    return wordsOnly.length
}

console.log(commentCount(reviews), "5 Davaleba")

// 6) ფუნქცია, რომელიც userებს აჯგუფებს დეპარტამენტის მიხედვით და ხელფასის კლებადობის მიხედვით ჩამოთვლის

const workers = [
  { name: "Ana", department: "HR", salary: 2000 },
  { name: "Nika", department: "IT", salary: 5000 },
  { name: "Luka", department: "IT", salary: 3500 },
  { name: "Mariam", department: "HR", salary: 3000 }
]

function sortDeptDescending(array5){
    const result = {}

    for (let worker of array5){
        if (!result[worker.department]){
            result[worker.department] = []
        }
        result[worker.department].push(worker)
    }

    for (let key in result){
        result[key].sort((a,b) => b.salary - a.salary)
    }
    return result
}

console.log(sortDeptDescending(workers), "6 Davaleba")


// 7) საყიდლების სიიდან საბოლოო ფასი

const shoppingCart = [
  { title: "Laptop", price: 2000, quantity: 1, discountPercent: 10 },
  { title: "Mouse", price: 50, quantity: 2, discountPercent: 0 },
  { title: "Keyboard", price: 100, quantity: 1, discountPercent: 20 }
]

function getFinalPrice(array6){
    let result = 0

    for (let item of array6){
        const sum = item.price * item.quantity
        const discounted = sum - (sum * item.discountPercent / 100)
        result += discounted
    }
    return result
}

console.log(getFinalPrice(shoppingCart), "7 Davaleba")

// 8) მასივს გადააქცევს ობიექტად და გარე ობიექტის key იქნება დანომრვა id-ის მიხედვით

const users = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Nika", age: 30 },
  { id: 3, name: "Luka", age: 22 }
]

function arrayToObject(array7){
    const result = {}

    for (let user of array7){
        result[user.id] = user
    }
    return result
}

console.log(arrayToObject(users), "Bolo Davaleba 8")