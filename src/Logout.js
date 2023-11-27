import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate('/login');
        // Optionally, you could clear any user-specific data from local storage or state here
    }, [dispatch, navigate]);

    return (
        <div>
            <p>Logging out</p>
        </div>
    );
};

export default Logout;
