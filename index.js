// Import dependencies
const {connection} = require('./database/connection');
const express = require('express');
const cors = require('cors');

// Welcome message
console.log("NODE API for SOCIAL NETWORK is up and running!!");   

// Connection to database
connection()

// Node server creation
const app = express();
const port = 3900;

// cors setup
app.use(cors());

// Body data to JS objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes()
// Test route
app.get('/test-route', (req, res) => {
    return res.status(200).json({
        message: 'API is working fine!'
    })
} )

// Server listening for HTTP requests
app.listen(port, ()=>{
    console.log("Server is running on port: ", port);
}) 