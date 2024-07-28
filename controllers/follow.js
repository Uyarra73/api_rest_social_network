// Test actions
const followTest = (req, res) => {
    return res.status(200).send({
        message: 'Message sent from: controllers/follow.js'
    });
}

// Export actions
module.exports = {
    followTest
}