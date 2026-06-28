const { default: mongoose } = require("mongoose");


const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: [10, "Price mustn't be less than 10"]
    }
}, {timestamps: true})

module.exports = mongoose.model("expense", expenseSchema)