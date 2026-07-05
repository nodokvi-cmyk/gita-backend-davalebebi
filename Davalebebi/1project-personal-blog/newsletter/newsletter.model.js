const { default: mongoose } = require("mongoose");


const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    isSubscribed: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = mongoose.model("newsletter", newsletterSchema)