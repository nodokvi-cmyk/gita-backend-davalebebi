// 1) davaleba

function convert(tempNumber, unit){
    if(unit === "C"){
        return tempNumber * (9 / 5) + 32
    } else{
        return tempNumber
    }
}

console.log(convert(5, "C"))
console.log(convert(41, "F"))

// 2) davaleba

function reverseWord(sityva){
    let result = ""

    for(let i = sityva.length - 1; i >= 0; i--){
        result += sityva[i] // result = result + sityva[i]? esec sheidzleba?
    }
    return result
}

console.log(reverseWord("Hidroeleqtrosadguri"))

// 3) davaleba

function countWords(sentence){
    let count = 0
    let words = sentence.split(" ")

    for (let i = 0; i < words.length; i++){
        count++
    }
    return count
}

console.log(countWords("Steel ball run"))

// 4) davaleba

const vowels = ["a", "e", "i", "o", "u"]

function countVowels(word){
    let count = 0
    let lowerWord = word.toLowerCase()

    for(let i = 0; i < lowerWord.length; i++){
        if (vowels.includes(lowerWord[i])){
            count++
        }
    }
    return count
}

console.log(countVowels("AtrAkcIoni"))

// 5) davaleba

function factorial(number){
    let count = 1

    for (let i = number; i > 0; i--){
        count = count * i
    }
    return count
}

console.log(factorial(5))

// 6) davaleba

function countEven(number){
    let sum = 0

    for (let i = 0; i < number; i++){
        if(i % 2 === 0){
            sum += i
        }
    }
    return sum
}

console.log(countEven(50))

// 7) davaleba

function grade(score){
    let result = ""

    if(score <= 100 && score >= 91){
        console.log("A")
    } else if(score < 91 && score >= 81){
        console.log("B")
    } else if (score < 81 && score >= 71){
        console.log("C")
    } else if (score < 71 && score >= 61){
        console.log("B")
    } else if (score < 61){
        console.log("F")
    } else{
        console.log("Ganusazgrveli")
    }

    return result
}

console.log(grade(85))
console.log(grade(200))

// 8) davaleba

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function checkPassword(password){
    
    let letters = password.split("")

        if (password.length >= 8 && letters.some(i => digits.includes(i)) && letters.some(i => i!== i.toLowerCase())){
            return "Misagebia"
        } else {
            return "Miugebelia"
        }
    }

console.log(checkPassword("Saxeli12345"))
console.log(checkPassword("nodo21312"))

// .some metodit AI-s gareshe ver gavaketebdi(hintebit), arvicodi eseti metodic tu iyo. albat sxva gzac arsebobda romelsac .some methodi ar daschirdeboda?
