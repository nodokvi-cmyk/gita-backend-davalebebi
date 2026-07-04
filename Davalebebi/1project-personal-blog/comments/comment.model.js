const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    comment: {
        type: String,
        required: true
    },
    targettedBlog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "blog"
    }
}, {timestamps: true})

module.exports = mongoose.model("comment", commentSchema)