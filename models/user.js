const {Schema, model} = require("mongoose");

// User schema
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user_role"
    },
    image: {
        type: String,
        default: "default_image.jpg"
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

module.exports = model("User", UserSchema, "users");