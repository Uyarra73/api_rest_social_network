// Test actions
const userTest = (req, res) => {
    return res.status(200).send({
        message: 'Message sent from: controllers/user.js'
    });
}

// Export actions
module.exports = {
    userTest
}