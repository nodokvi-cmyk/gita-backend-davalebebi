
const fs = require("fs/promises")

// Task 2) phone cli - add, delete, show contactList

const add = "add"
const remove = "delete"
const show = "show"

const [, , operation, number, name] = process.argv

async function phoneContacts(){
    if (operation === add){
        const data = await fs.readFile("contacts.json")
        const parseData = data.length > 0 ? JSON.parse(data) : []
        if (!parseData.some((contact) => contact.number === number)){
            parseData.push({
            number: number,
            name: name,
        })} else {
            console.log("Contact with this number already exists")
        }
        await fs.writeFile("contacts.json", JSON.stringify(parseData, null, 2))
    }
    if (operation === remove){
        const data = await fs.readFile("contacts.json")
        const parseData = data.length > 0 ? JSON.parse(data) : []
        const updatedContactList = parseData.filter((contact) => contact.number !== number)
        await fs.writeFile("contacts.json", JSON.stringify(updatedContactList, null, 2))
    }
    if (operation === show){
        const data = await fs.readFile("contacts.json", "utf8")
        console.log(data)
    }
}

phoneContacts()