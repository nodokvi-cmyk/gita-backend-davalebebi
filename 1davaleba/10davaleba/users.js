
const fs = require("fs/promises")

// Task 1) https://jsonplaceholder.typicode.com/users - users id, name, username and email -> into users.json

async function getUsersInfo(){
    const resp = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await resp.json()

    const requiredInfo = data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
    }))
    
    await fs.writeFile("users.json", JSON.stringify(requiredInfo, null, 2)) // null, 2 for better structure
}

getUsersInfo()