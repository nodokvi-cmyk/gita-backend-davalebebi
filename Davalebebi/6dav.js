// 1) დავალება

// console.log("1");
// setTimeout(() => console.log("2"), 100); // Low - 0.1 sec delay
// setTimeout(() => console.log("3"), 0); // Low - no delay
// Promise.resolve().then(() => console.log("4")); // High Prio
// console.log("5");

// 1) Mimdevroba: "1", "5", "4", "3", "2"


// 2) დავალება

// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");

// 2) Mimdevroba: "1", "5", "3", "2", "4"


// 3) დავალება - sleep ფუნცია

function sleep(ms){  // aq async arunda
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

// await sleep(1000)

// console.log("1 wami")

// await sleep(2000)

// console.log("3 wami")

// 4) დავალება - 1 დან 20მდე რამდომ რიცხვები. პარამეტრთან დამთხვევის შემთხვევაში გაჩერება

function randomNumber(num){
    if (num >= 1 && num <= 20){
        let intervalid = setInterval(() => {
            let randomNum = (Math.floor(Math.random() * 20) + 1)
            console.log(randomNum)
            if (randomNum === num){
                clearInterval(intervalid)
            }
        }, 1000)
    }
}

// randomNumber(18)

// 5) დავალება - რიცხვიდან 0მდე დალოგვა ფუნქციის მეორე პარამეტრში აღნიშნულ დროის მონაკვეთში

function countdownTime(number, ms){
    let countTime = ms / number

    let intervalid1 = setInterval(() => {
        console.log(number)
        number--
        if (number === 0){
            clearInterval(intervalid1)
            // console.log(0) - თუ გვინდა რო 0იც დაგვილოგოს
        }
    }, countTime)
}

countdownTime(30, 3000)

// ან if (number === -1){ // 0ic Tu gvinda
            // clearInterval(intervalid1)