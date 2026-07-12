"use strict";
// გადავწეროთ მოცემული ფაილი typescript_ზე.
Object.defineProperty(exports, "__esModule", { value: true });
// Independent Functions
function addNumbers(a, b) {
    return a + b;
}
function multiplyNumbers(a, b) {
    return a * b;
}
function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function filterEvenNumbers(numbers) {
    return numbers.filter((num) => num % 2 === 0);
}
function findMax(numbers) {
    return Math.max(...numbers);
}
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
}
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * calculateFactorial(n - 1);
    }
}
// Test Cases
const sumResult = addNumbers(5, 3);
const multiplicationResult = multiplyNumbers(4, 7);
const capitalizedString = capitalizeString("javascript is fun");
const evenNumbers = filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(`Sum: ${sumResult}`);
console.log(`Multiplication: ${multiplicationResult}`);
console.log(`Capitalized String: ${capitalizedString}`);
console.log(`Even Numbers: ${evenNumbers}`);
// console.log("even numberws:", evenNumbers)
const maxNumber = findMax([23, 56, 12, 89, 43]);
const isPalindromeResult = isPalindrome("A man, a plan, a canal, Panama");
const factorialResult = calculateFactorial(5);
console.log(`Max Number: ${maxNumber}`);
console.log(`Is Palindrome: ${isPalindromeResult}`);
console.log(`Factorial: ${factorialResult}`);
// სასურველია გავაკეთოთ Rectangle და Circle კლაზები და დავუმატოთ შესაბამისი მეთოდები.
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateRectangleArea() {
        return this.width * this.height;
    }
    calculateRectanglePerimeter() {
        return 2 * (this.width + this.height);
    }
}
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    calculateCircleArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }
    calculateCirclePerimeter() {
        return 2 * Math.PI * this.radius;
    }
}
// Test cases
const rectangle1 = new Rectangle(5, 8);
const circle1 = new Circle(3);
const rectangle1Area = rectangle1.calculateRectangleArea();
const rectangle1Perimeter = rectangle1.calculateRectanglePerimeter();
const circle1Area = circle1.calculateCircleArea();
const circle1Perimeter = circle1.calculateCirclePerimeter();
console.log(`Rectangle Area: ${rectangle1Area}, Perimeter: ${rectangle1Perimeter}`);
console.log(`Circle Area: ${circle1Area}, Perimeter: ${circle1Perimeter}`);
class BankAccount {
    accountNumber;
    balance;
    transactionHistory = [];
    constructor(accountNumber, initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    getAccountInfo() {
        return {
            accountNumber: this.accountNumber,
            balance: this.balance,
        };
    }
    deposit(depositSum) {
        this.balance += depositSum;
        console.log(depositSum, "deposited successfully");
        this.recordTransaction(`Deposit: ${depositSum} - ${new Date().toISOString()}`);
    }
    withdraw(withdrawSum) {
        if (withdrawSum <= this.balance) {
            this.balance -= withdrawSum;
            console.log(withdrawSum, "withdrew successfully");
            this.recordTransaction(`Withdraw: ${withdrawSum} - ${new Date().toISOString()}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    transferFunds(targetAccount, transferSum) {
        if (transferSum <= this.balance && targetAccount) {
            this.balance -= transferSum;
            targetAccount.balance += transferSum;
            console.log(transferSum, `transferred to ${targetAccount.accountNumber} successfully`);
            this.recordTransaction(`Transfer: ${transferSum} to ${targetAccount.accountNumber} - ${new Date().toISOString()}`);
        }
        else {
            console.log("Bank account doesn't exist or you have insufficient balance");
        }
    }
    getTransactionHistory() {
        return this.transactionHistory;
    }
    recordTransaction(updateInfo) {
        this.transactionHistory.push(updateInfo);
    }
}
const nodosBankAccount = new BankAccount("dsadsa7281218dsa", 500);
nodosBankAccount.deposit(500);
nodosBankAccount.withdraw(300);
nodosBankAccount.withdraw(3000);
const giorgisBankAccount = new BankAccount("99d8jsa9dj2819", 1000);
nodosBankAccount.transferFunds(giorgisBankAccount, 700);
console.log(nodosBankAccount.getAccountInfo());
console.log(nodosBankAccount.getTransactionHistory());
giorgisBankAccount.withdraw(1200);
giorgisBankAccount.transferFunds(nodosBankAccount, 250);
console.log(giorgisBankAccount.getTransactionHistory());
console.log(giorgisBankAccount.getAccountInfo());
//# sourceMappingURL=index.js.map