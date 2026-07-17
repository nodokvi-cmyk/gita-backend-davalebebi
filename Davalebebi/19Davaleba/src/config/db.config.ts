import dns from "dns"
dns.setServers(['8.8.8.8', '8.8.4.4'])

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()



const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("DB Connected Successfully")
    } catch(e) {
        console.log("Can't Connect DB", e)
    }
}

export default connectToDb