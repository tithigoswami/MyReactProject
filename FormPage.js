import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Birmingham']
};

function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'First name is required';
    if (!formData.lastName) errs.lastName = 'Last name is required';
    if (!formData.username) errs.username = 'Username is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errs.phoneNumber = 'Valid 10-digit number required';
    if (!formData.country) errs.country = 'Select a country';
    if (!formData.city) errs.city = 'Select a city';
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) errs.pan = 'Invalid PAN';
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar)) errs.aadhar = 'Aadhar must be 12 digits';

    setErrors(errs);
    setIsFormValid(Object.keys(errs).length === 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'country') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Username', name: 'username' },
          { label: 'Email', name: 'email', type: 'email' },
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label>{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <div>
          <label>Phone Number</label>
          <div>
            <input
              type="text"
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              style={{ width: '60px' }}
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{ width: 'calc(100% - 70px)' }}
            />
          </div>
          {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
        </div>

        <div>
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countries).map(country => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
        </div>

        <div>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            {(countries[formData.country] || []).map(city => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
        </div>

        <div>
          <label>PAN Number</label>
          <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
          {errors.pan && <div style={{ color: 'red' }}>{errors.pan}</div>}
        </div>

        <div>
          <label>Aadhar Number</label>
          <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
          {errors.aadhar && <div style={{ color: 'red' }}>{errors.aadhar}</div>}
        </div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
