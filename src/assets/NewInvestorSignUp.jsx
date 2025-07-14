import { useState } from 'react';
import { createInvestor } from '../services/api';
import './NewInvestorSignUp.css';

export default function NewInvestorSignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    nationalId: '',
    location: '',
    email: '',
    dateOfBirth: '',
   // nationalIdFile: null,
   // passportPhoto: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
    
    // Update the file name display
    const fileNameDisplay = e.target.nextElementSibling.querySelector('.file-name');
    if (files && files[0]) {
      fileNameDisplay.textContent = files[0].name;
    } else {
      fileNameDisplay.textContent = 'No file chosen';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
    
      if (!formData.nationalIdFile || !formData.passportPhoto) {
        throw new Error('Please upload both required documents');
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      await createInvestor(formDataToSend);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
      
  };

  if (success) {
    return (
      <div className="signup-container">
        <h2 className="signup-title">Registration Successful!</h2>
        <div className="success-message">
          <p>Thank you for registering as an investor.</p>
          <p>Your application is under review and you'll receive a confirmation email shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">Investor Registration</h2>
      <p className="signup-subtitle">Join our investment platform today</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              className="form-input" 
              placeholder="Enter your full name" 
              value={formData.fullName}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber"
              className="form-input" 
              placeholder="07123456789" 
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">National ID</label>
            <input 
              type="text" 
              name="nationalId"
              className="form-input" 
              placeholder="Enter your national ID" 
              value={formData.nationalId}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              name="location"
              className="form-input" 
              placeholder="City, Country" 
              value={formData.location}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input 
              type="date" 
              name="dateOfBirth"
              className="form-input" 
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required 
            />
          </div>

         <div className="form-group full-width">
            <label className="form-label">National ID Copy (PDF)</label>
            <div className="file-upload">
              <input 
                type="file" 
                id="id-upload" 
                name="nationalIdFile"
                accept=".pdf" 
                className="file-input" 
                onChange={handleFileChange}
                required
              />
              <label htmlFor="id-upload" className="file-label">
                <span className="file-button">Choose File</span>
                <span className="file-name">No file chosen</span>
              </label>
            </div>
          </div>
          
          
          <div className="form-group full-width">
            <label className="form-label">Passport Photo (JPG/PNG)</label>
            <div className="file-upload">
              <input 
                type="file" 
                id="passport-upload" 
                name="passportPhoto"
                accept=".jpg,.jpeg,.png" 
                className="file-input" 
                onChange={handleFileChange}
                required
              />
              <label htmlFor="passport-upload" className="file-label">
                <span className="file-button">Choose File</span>
                <span className="file-name">No file chosen</span>
              </label>
            </div>
          </div>
        

        <div className="form-footer">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Create Investor Account'}
          </button>
          <p className="form-disclaimer">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        </div>
      </form>
    </div>

  );
}