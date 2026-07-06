const { default: mongoose } = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "comment"
    }]
}, {timestamps: true})

module.exports = mongoose.model("blog", blogSchema)