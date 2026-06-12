// Task 2) server about footballers' info + GET POST, DELETE


const http = require("http")
const url = require("url")
const fs = require("fs/promises")

const aboutInfo = {
    projectName: "Football Players API",
    version: "1.0.0",
    description: "A simple REST API for managing football players from different nations.",
    allowedMethods: ["GET", "POST", "DELETE"]
};


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)

    if(req.method === "GET" && (parsedUrl.pathname === "/about" || parsedUrl.pathname === "/")){
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(aboutInfo))
        
    }
    
    if(req.method === "GET" && parsedUrl.pathname === "/players"){
        res.writeHead(200, {"content-type": "application/json"})
        const data = await fs.readFile("players.json", "utf8")
        
        if(parsedUrl.query.nation){
            const dataArr = JSON.parse(data)
            const filterPlayerByCountry = dataArr.filter((player) => player.nation.toLowerCase() === parsedUrl.query.nation.toLowerCase())
            res.end(JSON.stringify(filterPlayerByCountry))
        }else{
            res.end(data)
        }
    }

    if(req.method === "POST" && parsedUrl.pathname === "/players"){
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", async () => {
            const parsedBody = JSON.parse(body)
            const data = await fs.readFile("players.json", "utf8")
            const resp = JSON.parse(data)
            const lastId = resp[resp.length - 1]?.id || 0

            if ((parsedBody.name && parsedBody.name.length >= 2) && parsedBody.nation && parsedBody.position && parsedBody.club){
                const addedPlayer = {
                    id: lastId + 1,
                    name: parsedBody.name,
                    nation: parsedBody.nation,
                    position: parsedBody.position,
                    club: parsedBody.club,
                }
                resp.push(addedPlayer)
                await fs.writeFile("players.json", JSON.stringify(resp))
                res.writeHead(200, {"content-type": "application/json"})
                res.end(JSON.stringify("Player added successfully"))
            }else{
                res.writeHead(400, { "content-type": "application/json" })
                res.end(JSON.stringify({ error:"Insufficient info"}))
            }
        })
    }

    if(req.method === "DELETE" && parsedUrl.pathname.startsWith("/players")){
        const targetedPlayerId = parsedUrl.pathname.split("/")[2]
        const data = await fs.readFile("players.json", "utf8")
        const dataArr = JSON.parse(data)
        const id = dataArr.findIndex((player) => player.id === Number(targetedPlayerId))
        if (id === -1){
            res.writeHead(404, {"content-type": "application/json"})
            return res.end(JSON.stringify({message: "Player not found"}))
        }else{
            dataArr.splice(id, 1)
            await fs.writeFile("players.json", JSON.stringify(dataArr))
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify("Player deleted successfully"))
        }
    }
})

server.listen(5000, () => {
    console.log("Server running on port http://localhost:5000")
})