const Company = require('../models/companyModel');
const ExperienceTracker = require('../models/experienceTrackerModel');


// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const {
      Company_Name,
      Tagline,
      Website,
      Company_Size,
      Keywords,
      Careers_Page_ATS,
      Company_LinkedIn,
      Company_Logo,
      About_Company,
      Company_Description,
    } = req.body;

    //Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Only admins can add companies.',
      });
    }

    const company = await Company.create({
      Company_Name,
      Tagline,
      Website,
      Company_Size,
      Keywords,
      Careers_Page_ATS,
      Company_LinkedIn,
      Company_Logo,
      About_Company,
      Company_Description
    });

    res.status(201).json({
      status: 'success',
      data: {
        company,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


// Get company details by ID
exports.getCompanyDetails = async (req, res) => {
    try {
      const company = await Company.findById(req.params.companyId);
  
      if (!company) {
        return res.status(404).json({
          status: 'fail',
          message: 'Company not found.',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          company,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error.',
      });
    }
  };

// Add experience tracker for a company
exports.addExperienceTracker = async (req, res) => {
    try {
      const { companyId } = req.params;
      const { role, experience, url } = req.body;
  
      const company = await Company.findById(companyId);
  
      if (!company) {
        return res.status(404).json({
          status: 'fail',
          message: 'Company not found.',
        });
      }
  
      const experienceTracker = await ExperienceTracker.create({
        companyId,
        role,
        experience,
        url,
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Experience tracker added successfully.',
        data: {
          experienceTracker,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error.',
      });
    }
  };
  
  // Get all experience trackers for a company
  exports.getAllExperienceTrackers = async (req, res) => {
    try {
      const { companyId } = req.params;
  
      const experienceTrackers = await ExperienceTracker.find({ companyId });
  
      res.status(200).json({
        status: 'success',
        data: {
          experienceTrackers,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error.',
      });
    }
  };