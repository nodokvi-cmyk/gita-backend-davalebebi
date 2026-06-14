// 1) funqcia abreviatura
// A

function getAbbr(firstName, lastName){
    let result = ""
    result += firstName.charAt(0) + "." + lastName.charAt(0)

    return result.toUpperCase()
}

console.log(getAbbr("Luka", "beridze"))

// B

function getAbbr1(fullName){
    let result1 = ""
    result1 += fullName.charAt(0) + "." + fullName.charAt(fullName.indexOf(" ") + 1)

    return result1.toUpperCase()
}

console.log(getAbbr1("giorgi andronikashvili"))

// 2) cifrebis jami ricxvshi

function digitSum(ricxvi){
    let count = 0
    for (let i = 0; i < ricxvi.toString().length; i++){
        count += Number(ricxvi.toString()[i])
    }
    return count

}

console.log(digitSum(5202241))

// 3) duplicate letteris washla

function removeDup(word){
    let result = ""

    for (let i = 0; i < word.length; i++){
        if (!result.includes(word[i])){
            result += word[i]
        }
    }
    return result
}

console.log(removeDup("Coffffeee"))

// AI-s alternativa

function removeDup(word){
    let result = ""

    for (let i = 0; i < word.length; i++){
        if (result.includes(word[i])){
            continue;
        }
        result += word[i]
    }
    return result
}

console.log(removeDup("Coffffeee"))

// 4) spacebis washla stringidan

function removeSpaces(sentence1){
    let result = ""
    let sentenceChar = sentence1.split(" ")

    for (let i = 0; i < sentenceChar.length; i++){
        result += sentenceChar[i]
    }
    return result
}

console.log(removeSpaces("Mors   Mutual   Insurance"))

// 5) sityvebis shemobruneba magram titoeuli sityva original adgilas rcheba rigshi

function reverseEachWord(sentence2){
    let result = ""
    let sityvebi = sentence2.split(" ")

    for (let i = 0; i < sityvebi.length; i++){
        let reversedWord = ""
        for (let b = sityvebi[i].length - 1; b >= 0; b--){
            reversedWord += sityvebi[i][b]
        }
        result += reversedWord + " "
    }
    return result
}

console.log(reverseEachWord("Sweet Red Apple"))