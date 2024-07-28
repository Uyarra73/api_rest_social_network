// Test actions
const publicationTest = (req, res) => {
    return res.status(200).send({
        message: 'Message sent from: controllers/publication.js'
    });
}

// Export actions
module.exports = {
    publicationTest
}