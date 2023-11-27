import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9]{10,15}$/;
const ZIPCODE_REGEX = /^[0-9]{5}$/;
const CITY_REGEX = /^[a-zA-Z\s]+$/; 

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        agreeToTerms: false
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const validate = () => {
        let errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email || !EMAIL_REGEX.test(formData.email)) errors.email = 'Invalid email';
        if (!formData.phone || !PHONE_REGEX.test(formData.phone)) errors.phone = 'Invalid phone number';
        if (!formData.city || !CITY_REGEX.test(formData.city)) errors.city = 'Invalid city name';
        if (!formData.state) errors.state = 'State is required';
        if (!formData.zip || !ZIPCODE_REGEX.test(formData.zip)) errors.zip = 'Invalid zip code';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            localStorage.setItem('registrationData', JSON.stringify(formData));
            alert('Registration successful!');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                city: '',
                state: '',
                zip: '',
                agreeToTerms: false
            });
            setFormErrors({});
            navigate('/Login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input name="username" value={formData.username} onChange={handleChange} />
            {formErrors.username && <p>{formErrors.username}</p>}

            <label>Email:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} />
            {formErrors.email && <p>{formErrors.email}</p>}

            <label>Phone Number:</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            {formErrors.phone && <p>{formErrors.phone}</p>}

            <label>Password:</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} />

            <label>Confirm Password:</label>
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}

            <label>City:</label>
            <input name="city" value={formData.city} onChange={handleChange} />
            {formErrors.city && <p>{formErrors.city}</p>}

            <label>State:</label>
            <input name="state" value={formData.state} onChange={handleChange} />
            {formErrors.state && <p>{formErrors.state}</p>}

            <label>Zip Code:</label>
            <input name="zip" value={formData.zip} onChange={handleChange} />
            {formErrors.zip && <p>{formErrors.zip}</p>}

            <label>
                Agree to Terms:
                <input name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleCheckboxChange} />
            </label>
            {formErrors.agreeToTerms && <p>{formErrors.agreeToTerms}</p>}

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;


