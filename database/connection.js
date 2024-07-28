const mongoose = require('mongoose');

// Connect to MongoDB
const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/my_socialnetwork");
        console.log('Connected to db: my_socialnetwork');
    } catch (err) {
        console.log(err);
        throw new Error('Could not connect to MongoDB')
    }
}

module.exports = {
    connection
}