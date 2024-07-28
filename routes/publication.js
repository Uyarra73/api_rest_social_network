const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/publication');

// Define routes
router.get("/publication-test", PublicationController.publicationTest);

// Export routes
module.exports = router;