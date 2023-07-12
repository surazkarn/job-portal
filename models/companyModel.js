const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  Company_Name: {
    type: String,
    required: true,
  },
  Company_Logo: {
    type: String,
    required: true,
  },
  Company_Size: {
    type: String,
    enum: [
      '< 10 employees',
      '10-50 employees',
      '51-100 employees',
      '101-500 employees',
      '501-1000 employees',
      '1001-10000 employees',
      '10000+ employees',
    ],
    required: true,
  },
  Tagline: String,
  Website: String,
  Company_Size: String,
  Keywords: [String],
  Careers_Page_ATS: String,
  Company_LinkedIn: String,
  About_Company: String,
  Company_Description: String,
//   Author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
});

module.exports = mongoose.model('Company', companySchema);
