const mongoose = require('mongoose');

// Define a schema for the enrollment model
const enrollmentSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Contact Information
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  
  // Document Verification
  ageProof: {
    type: [String], // Array of accepted documents
    required: true
  },
  addressProof: {
    type: [String], // Array of accepted documents
    required: true
  },
  identityProof: {
    type: [String], // Array of accepted documents
    required: true
  },
  passportPhoto: {
    type: String, // File path or URL for passport size photo
    required: true
  },
  medicalReports: {
    type: [String], // Array of file paths or URLs for medical reports
    required: false // Medical reports might not be required for all policies
  },
  
  // Owner Information
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for authentication
    required: true
  },
});

// Create the Enrollment model using the schema
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
