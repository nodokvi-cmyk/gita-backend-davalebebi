// Task 1) ToDo App class

const all = "all"
const active = "active"
const done = "done"

class ToDoList{
    
    #toDo = []
    #idCounter = 0

    addTask(title){
        this.#idCounter++
        this.#toDo.push({
            id: this.#idCounter,
            title: title,
            isDone: false,
            timeCreated: new Date().toISOString(),
        })
    }

    removeTask(taskId){
        this.#toDo = this.#toDo.filter((task) => task.id !== taskId)
    }

    completeTask(taskId){
        const selectedTask = this.#toDo.find((task) => task.id === taskId)
        selectedTask.isDone = true
    }

    taskFilter(filter){
        if (filter === all){
            return this.#toDo
        }
        if (filter === active){
            const activeTasks = this.#toDo.filter((task) => task.isDone === false)
            return activeTasks
        }
        if (filter === done){
            const doneTasks = this.#toDo.filter((task) => task.isDone === true)
            return doneTasks
        }
    }
}


const giorgisToDoList1 = new ToDoList
giorgisToDoList1.addTask("Workout")
giorgisToDoList1.addTask("Play football")
giorgisToDoList1.addTask("Homework")
giorgisToDoList1.completeTask(2)
// console.log(giorgisToDoList1.taskFilter(active))


// Task 2) Shopping Cart class

const computerStore = [
    { id: 482, title: "Gaming Keyboard Mechanical", price: 89.99 },
    { id: 105, title: "SSD NVMe 1TB", price: 115.50 },
    { id: 731, title: "RTX 4070 Graphic Card", price: 599.00 },
    { id: 219, title: 'Curved Monitor 27"', price: 245.00 },
    { id: 954, title: "Wireless Gaming Mouse", price: 64.99 },
    { id: 302, title: "DDR5 RAM 32GB", price: 135.00 },
    { id: 847, title: "Liquid CPU Cooler", price: 109.99 },
    { id: 113, title: "External Hard Drive 2TB", price: 79.00 },
    { id: 606, title: "Power Supply 850W", price: 125.50 },
    { id: 550, title: "HD Webcam 1080p", price: 45.00 },
]

class ShoppingCart{
    #cart = []

    addToCart(productId, number){
        const selectedItem = computerStore.find((item) => item.id === productId)
        this.#cart.push({
            id: selectedItem.id,
            productName: selectedItem.title,
            price: selectedItem.price,
            quantity: number,
            addedAt: new Date().toISOString()
        })
    }

    removeFromCart(productId){
        const selectedCartItem = this.#cart.find((item) => item.id === productId)
        if (selectedCartItem.quantity > 1){
            selectedCartItem.quantity--
        } else {
        this.#cart = this.#cart.filter((item) => item.id !== productId)
        }
    }

    calculateTotalPrice(){
        let total = 0
        for (let item of this.#cart){
            total += item.price * item.quantity
        }
        console.log("Total Price -")
        return total
    }

    updateItem(productId, updatedQuantityNumber){
        const selectedCartItem = this.#cart.find((item) => item.id === productId)
        selectedCartItem.quantity = updatedQuantityNumber
    }

    getCart(){
        return this.#cart
    }

    clearCart(){
        this.#cart = []
    }
}

const giorgisCart1 = new ShoppingCart
giorgisCart1.addToCart(219, 2)
giorgisCart1.addToCart(606, 1)
giorgisCart1.addToCart(731, 1)
giorgisCart1.addToCart(302, 4)
giorgisCart1.addToCart(954, 1)
giorgisCart1.removeFromCart(302)
giorgisCart1.removeFromCart(302)
giorgisCart1.removeFromCart(302)
giorgisCart1.removeFromCart(606)
giorgisCart1.updateItem(731, 3)
giorgisCart1.updateItem(219, 1)
// giorgisCart1.clearCart()
// console.log(giorgisCart1.getCart())
// console.log(giorgisCart1.calculateTotalPrice())


// Task 3) Library class

const yearAscending = "yearAscending"
const yearDescending = "yearDescending"

const library = [
    { id: 101, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 205, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 309, title: "1984", author: "George Orwell", year: 1949 },
    { id: 412, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { id: 518, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 }
]

class Library{
    #bookList = []

    addBook(bookId, number){
        const selectedBook = library.find((book) => book.id === bookId)
        this.#bookList.push({
            id: selectedBook.id,
            title: selectedBook.title,
            author: selectedBook.author,
            year: selectedBook.year,
            quantity: number,
        })
    }

    removeBook(bookId){
        const selectedBookFromList = this.#bookList.find((book) => book.id === bookId)
        if (selectedBookFromList.quantity > 1){
            selectedBookFromList.quantity--
        } else{
            this.#bookList = this.#bookList.filter((book) => book.id !== bookId)
        }
    }

    getBookList(filter){
        if (filter === yearAscending){
        const yearUp = this.#bookList 
        yearUp.sort((a, b) => a.year - b.year)
        return yearUp
        } else if (filter === yearDescending){
        const yearDown = this.#bookList 
        yearDown.sort((a, b) => b.year - a.year)
        return yearDown
        } else if (filter === undefined){
        return this.#bookList
        }
    }
}

const lukasLibrary1 = new Library
lukasLibrary1.addBook(205, 1)
lukasLibrary1.addBook(412, 4)
lukasLibrary1.addBook(309, 1)
lukasLibrary1.removeBook(412)
lukasLibrary1.removeBook(412)
// console.log(lukasLibrary1.getBookList(yearDescending))
// console.log(lukasLibrary1.getBookList(yearAscending))



// Task 4) Contact Manager

class ContactManager{
    #contactsList = []

    addNewContact(name, phoneNumber, email){
        const duplicateNumber = this.#contactsList.find((contact) => contact.number === phoneNumber)
        const duplicateEmail = this.#contactsList.find((contact) => contact.email === email)

        if (!duplicateNumber && !duplicateEmail){
        this.#contactsList.push({
            name: name,
            number: phoneNumber,
            email: email,
        })
        } else {
            console.log("Contact with such a phone number or an email already exists")
        }
    }

    deleteContact(name){
        this.#contactsList = this.#contactsList.filter((contact) => contact.name !== name)
    }

    updateContact(name, {newPhoneNumber, newEmail} = {}){
        const selectedContact = this.#contactsList.find((contact) => contact.name === name)

        if (selectedContact){
            if (newPhoneNumber){
            selectedContact.number = newPhoneNumber
            }
            if (newEmail) {
            selectedContact.email = newEmail
            }
        } else{
            console.log("Contact not found")
        }
    }

    viewAllContacts(){
        return this.#contactsList
    }
}

const nikasContacts1 = new ContactManager
nikasContacts1.addNewContact("Gela Geladze", 5555, "Gela@gmail.com")
nikasContacts1.addNewContact("Giorgi Giorgadze", 2222, "Giorgi@gmail.com")
nikasContacts1.addNewContact("Dato Davitashvili", 3333, "Dato@gmail.com")
nikasContacts1.addNewContact("Gia Giadze", 4444, "Giorgi@gmail.com")
nikasContacts1.addNewContact("Luka Lukadze", 2222, "Luka@gmail.com")
nikasContacts1.deleteContact("Gela Geladze")
nikasContacts1.updateContact("Giorgi Giorgadze", {
    newPhoneNumber: 7777, 
    newEmail: "gia@yahoo.com"})
nikasContacts1.updateContact("Giorgi Giorgadze")
console.log(nikasContacts1.viewAllContacts())