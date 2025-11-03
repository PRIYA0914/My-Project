import React, { useState } from 'react';
import './ComplaintForm.css';

export default function ComplaintForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Complaint Details
    complaintCategory: '',
    complaintSubCategory: '',
    subject: '',
    description: '',
    dateOfIncident: '',
    location: '',
    urgencyLevel: 'medium',
    
    // Additional Information
    previouslyReported: '',
    expectedResolution: '',
    attachments: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const complaintCategories = {
    'Infrastructure and Public Utilities': [
      'Water Supply Issues',
      'Electricity Problems',
      'Road and Transportation',
      'Sewerage and Drainage',
      'Street Lighting',
      'Waste Management',
      'Public Buildings',
      'Other Infrastructure'
    ],
    'Health and Sanitation': [
      'Hospital Services',
      'Primary Health Centers',
      'Sanitation Issues',
      'Food Safety',
      'Disease Control',
      'Medical Equipment',
      'Health Insurance',
      'Other Health Issues'
    ],
    'Agriculture and Irrigation': [
      'Irrigation Systems',
      'Crop Insurance',
      'Fertilizer Supply',
      'Seed Quality',
      'Agricultural Loans',
      'Market Access',
      'Weather Information',
      'Other Agriculture Issues'
    ],
    'Education and Welfare Schemes': [
      'School Infrastructure',
      'Teacher Issues',
      'Mid-day Meals',
      'Scholarship Problems',
      'Pension Schemes',
      'Welfare Benefits',
      'Skill Development',
      'Other Education/Welfare'
    ],
    'Law and Administration': [
      'Police Services',
      'Court Procedures',
      'Document Verification',
      'License Issues',
      'Tax Problems',
      'Government Office Services',
      'Corruption Complaints',
      'Other Administrative Issues'
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset subcategory when category changes
      ...(name === 'complaintCategory' && { complaintSubCategory: '' })
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate complaint ID
      const complaintId = 'GRS' + Date.now();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call parent submit handler
      if (onSubmit) {
        onSubmit({ ...formData, complaintId });
      }
      
      alert(`Complaint filed successfully! Your complaint ID is: ${complaintId}`);
      
      // Reset form
      setFormData({
        fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
        complaintCategory: '', complaintSubCategory: '', subject: '', description: '',
        dateOfIncident: '', location: '', urgencyLevel: 'medium',
        previouslyReported: '', expectedResolution: '', attachments: null
      });
      setCurrentStep(1);
      onClose();
      
    } catch (error) {
      alert('Error filing complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="complaint-modal-overlay" onClick={onClose}>
      <div className="complaint-modal" onClick={e => e.stopPropagation()}>
        <div className="complaint-header">
          <h2>File a Grievance Complaint</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Personal Details</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Complaint Details</div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Additional Info</div>
        </div>

        <form onSubmit={handleSubmit} className="complaint-form">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    rows="3"
                    placeholder="Enter your complete address"
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="City name"
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="State name"
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    className="form-input"
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Complaint Details */}
          {currentStep === 2 && (
            <div className="form-step">
              <h3>Complaint Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Complaint Category *</label>
                  <select
                    name="complaintCategory"
                    value={formData.complaintCategory}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Category</option>
                    {Object.keys(complaintCategories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sub-Category *</label>
                  <select
                    name="complaintSubCategory"
                    value={formData.complaintSubCategory}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    disabled={!formData.complaintCategory}
                  >
                    <option value="">Select Sub-Category</option>
                    {formData.complaintCategory && 
                      complaintCategories[formData.complaintCategory].map(subCat => (
                        <option key={subCat} value={subCat}>{subCat}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Incident *</label>
                  <input
                    type="date"
                    name="dateOfIncident"
                    value={formData.dateOfIncident}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Urgency Level</label>
                  <select
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Brief subject of your complaint"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Location of Incident *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Specific location where the issue occurred"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Detailed Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    rows="5"
                    placeholder="Describe your complaint in detail..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <div className="form-step">
              <h3>Additional Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Previously Reported?</label>
                  <select
                    name="previouslyReported"
                    value={formData.previouslyReported}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Attach Supporting Documents</label>
                  <input
                    type="file"
                    name="attachments"
                    onChange={handleFileChange}
                    className="form-input"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <small className="file-hint">Accepted formats: PDF, Images, Word documents (Max 5MB)</small>
                </div>
                <div className="form-group full-width">
                  <label>Expected Resolution</label>
                  <textarea
                    name="expectedResolution"
                    value={formData.expectedResolution}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                    placeholder="What resolution do you expect for this complaint?"
                  />
                </div>
              </div>
              
              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I hereby declare that the information provided above is true to the best of my knowledge and I understand that providing false information is a punishable offense.</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Next
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Filing Complaint...' : 'Submit Complaint'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}