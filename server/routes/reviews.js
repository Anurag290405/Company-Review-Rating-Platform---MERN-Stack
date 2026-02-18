const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

// Create review for a company
router.post('/company/:companyId', controller.createReview);

// Like a review (increment)
router.patch('/:id/like', controller.likeReview);

module.exports = router;
