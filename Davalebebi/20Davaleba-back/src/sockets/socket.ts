import {Server} from "socket.io"
import userModel from "../users/user.model.js"

const onlineUsers: Record<string, {fullName: string}> = {}

export const startSockets = (io: Server) => {
    io.on("connection", async (socket) => {
        console.log("User Connected", socket.id)
        
        socket.on("add:online", ({email, fullName}) => {
            onlineUsers[email] = {
                fullName
            };
            
            (socket.data as {userEmail:string}).userEmail = email
            
            io.emit("online:users", onlineUsers)
        })
        socket.on("disconnect", () => {
            const email = (socket.data as { userEmail: string }).userEmail
            if(email){
                delete onlineUsers[email]
                io.emit("online:users", onlineUsers)
            }
        })

        socket.on("quiz:submit", async ({email, points}:{email:string, points:number}) => {
            await userModel.findOneAndUpdate(
                {email},
                {$inc: {score: points}}
            )
            
            const leaderboard = await userModel
            .find({}, "fullName email score")
            .sort({score: -1})
            
            io.emit("leaderboard:update", leaderboard)
        })
        
    })
}

