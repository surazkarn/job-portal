const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

// Create a new company
router.post('/create', companyController.createCompany);

// Get company details by ID
router.get('/:companyId', companyController.getCompanyDetails);

// Add experience tracker for a company
router.post('/:companyId/add-experience-tracker', companyController.addExperienceTracker);

// Get all experience trackers for a company
router.get('/:companyId/experience-trackers', companyController.getAllExperienceTrackers);

module.exports = router;
