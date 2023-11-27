
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from './store/authSlice'; // Import the login action




const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
   
    const [loginError, setLoginError] = useState('');
   

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setLoginError(''); // Reset error message on input change
    };

    const validateCredentials = () => {
        // Check if the fields are not empty
        if (!loginData.username || !loginData.password) {
            setLoginError('Username and Password are required');
            return false;
        }

        // Fetch stored data from localStorage
        const storedData = JSON.parse(localStorage.getItem('registrationData'));

        // Validate against stored credentials
        if (storedData && storedData.username === loginData.username && storedData.password === loginData.password) {
            return true;
        } else {
            setLoginError('Invalid username or password');
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCredentials()) {
            alert('Login successful!');
            dispatch(login()); 
            navigate('/dashboard');
            
        }
    };
    

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
                name="username"
                value={loginData.username}
                onChange={handleChange}
            />

            <label>Password:</label>
            <input
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
            />

            

            <button type="submit">Login</button>
            <button type="button" onClick={handleRegisterRedirect}>
                Don't have an account? Create a new one.
            </button>
            {loginError && <p className="error">{loginError}</p>}
        </form>
    );
};

export default Login;


