const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4'])
const { default: mongoose } = require('mongoose');

require("dotenv").config()

module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB Successfully")
    }catch(e){
        console.log("Couldn't connect to DB", e)
    }
}