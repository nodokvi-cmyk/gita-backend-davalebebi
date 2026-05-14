// 1) Funqcia - masivis sashualo aritmetikuli
const randomNums = [1, 12, 45, 421, 29, 91]

function getAverage(array){
    let count = 0

    for (let i = 0; i < array.length; i++){
        count += array[i]
    }
    return count / array.length
}

console.log(getAverage([1, 10, 25, 27, 2, 72]))
console.log(getAverage(randomNums))

// 2) funqcia romelic ricxvis shebrunebul versias masivis 
// saxit abrunebs calkeul wevrebad(cifrebad)  

function getReverseDigits(number){
    let digits = []
    // aq number.toString cvladi calke rom shemeqmna optimizaciistvis uketesi iqneboda
    for (let i = number.toString().length - 1; i >= 0 ; i--){
        digits.push(Number(number.toString()[i]))
    }

    return digits
}

console.log(getReverseDigits(98735362))

// 3) Ori masividan pirveli abrunebs mxolod im wevrebs romelsac meore masivi ar sheicavs

const a = [1,2,3,4,5,6,7,8,9,10]

const b = [1,3,5,7,9]

function filter(firstArray, secondArray){
    let result = []
    
    for (let i = 0; i < firstArray.length; i++){
        if (!secondArray.includes(firstArray[i])){
            result.push(firstArray[i])
        }
    }
    return result
}

console.log(filter(a, b))

// 4) masivshi yvelaze didi ricxvi

const nums = [90, 82, 901, 29, 1022, 827, 92812, 2122, 29102]

function largestNum(masivi){
    let bigNum = masivi[0]

    for (let i = 1; i < masivi.length; i++){
        if (masivi[i] > bigNum){
            bigNum = masivi[i]
        }
    }
    return bigNum 
    // return [bigNum] // tu masivad gvinda amovigot
}

console.log(largestNum(nums))

// 5) palindromi stringebi masividan masivis saxit

const wordlist = ["Racecar", "madam", "instrument", "level", "radar", "animal", "fix"]

function getPali(array){
    let result = []
    
    for(let i = 0; i < array.length; i++){
        let word = array[i].toLowerCase()
        let isPali = true
        let sawyisi = 0
        for (let b = word.length - 1; b >= 0; b--){
            if (word[b] !== word[sawyisi]){
                isPali = false
                // aq break; c sheidzleba, radgan pirveli da bolo aso tu ar emtxveva, agar sheamowmebs tyuilad danarchens
            }
            sawyisi++
        }
        if(isPali){ // an if(isPali === true)
            result.push(word)
        }
    }

    return result
}

console.log(getPali(wordlist))

// 6) Ricxvebis masividan yvelaze gameorebadi ricxvi

const numberList = [1, 2, 92, 12, 0, 27, 0, 92, 2, 25, 50, 90, 20, 22, 92, 5, 25, 0, 92, 22]

function getMostRepeated(numlist){
    let repeat = 1
    let mostRepeated = numlist[0]  // an let mostRepeated;

    for (let i = 0; i < numlist.length; i++){
        let count = 0
        for (let b = 0; b < numlist.length; b++){
            if (numlist[i] === numlist[b]){
                count++
            }
        }
        if (count > repeat){
            repeat = count
            mostRepeated = numlist[i]
        }
    }

    return mostRepeated
}

console.log(getMostRepeated(numberList))