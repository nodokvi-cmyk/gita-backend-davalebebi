import dns from "dns"

import mongoose from "mongoose"


const connectToDb = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4'])

        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("DB Connected Successfully")
    } catch(e) {
        console.log("Can't Connect DB", e)
        throw e
    }
}

export default connectToDb