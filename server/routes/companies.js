const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');

// Create company
router.post('/', controller.createCompany);

// List companies with optional search/filter
router.get('/', controller.listCompanies);

// Get company with reviews and average rating
router.get('/:id', controller.getCompanyDetail);

module.exports = router;
