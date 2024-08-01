const {Schema, model} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "users");