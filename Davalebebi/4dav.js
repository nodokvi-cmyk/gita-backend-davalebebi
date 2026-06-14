// 1) Remove last characters of array elements

const colors = ["Green", "Red", "Black", "Yellow", "Blue"]

const lastRemoved = colors.map((color) => color.slice(0, color.length - 1)) // an color.slice(0, -1)

console.log(lastRemoved)

// 2) sum of the 2 of the most little elements of an array

// 15 ორჯერ თუ წერია????? 12ს დააბრუნებს მარტო
// CUDI VERSIA
const nums = [15, 293, 12, 81, 75, 35, 37]

const twoLittleSum1 = nums.sort((a, b) => a - b). filter((num) => num < nums[2]).reduce((prev, curr) => prev + curr, 0)

console.log(twoLittleSum1)
// CUDI VERSIA
// 15 ორჯერ თუ წერია????? 12ს დააბრუნებს მარტო

const nums2 = [15, 15, 293, 12, 81, 75, 35, 37]

const twoLittleSum2 = nums2.sort((a, b) => a - b).filter((num, index) => index < 2).reduce((prev, curr) => prev + curr, 0)
// an .filter((num, index) => index === 0 || index === 1)

console.log(twoLittleSum2)

// 3) sum of massive elements*numbers*

const numbers = [23, 231, 281, 928, 987, 534]

let sum = 0

numbers.forEach((num) =>{
    sum += num
})

console.log(sum)

// 4) return onl more than 5 character elements from an array and join them with # symbol

const animals = ["Dog", "Car", "Elephant", "Dolphin", "Tiger", "Lion", "Hedgehog"]

const fiveMore = animals.filter((animal) => animal.length > 5).join("#")

console.log(fiveMore)

// 5) array sorting by classes and average grade

// Shedegi unda iyos obieqti:
// {"A": 85, "B" 75}

const students = [ { 
name: "Ann",  cls: "A", grade: 90 }, { 
name: "Ben",  cls: "B", grade: 75 }, { 
name: "Cara", cls: "A", grade: 80 } 
]

const sorted = students.reduce((prev, {cls, grade}) => {
    if (!prev[cls]){
        prev[cls] = {total: grade, studentCount: 1}
    } else{
        prev[cls].total += grade
        prev[cls].studentCount++
    }
    return prev
}, {})

console.log(sorted)

// aqamde movedi chemi dzalebit, sashualo vegar gamoviyvane ert reduce-shi: A: { total: 170, studentCount: 2 },
//   B: { total: 75, studentCount: 1 } - aqedan. amitom axal obieqts shevqmni

const sortedClasses = Object.keys(sorted)

const result = {}

for (let i =0; i < sortedClasses.length; i++){
    result[sortedClasses[i]] = sorted[sortedClasses[i]].total / sorted[sortedClasses[i]].studentCount
}



// console.log(sortedClasses)


console.log(result)