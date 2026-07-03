const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["viewer", "admin"],
        default: "viewer"
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    birthDate: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "blog"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "comment"
    }]
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)