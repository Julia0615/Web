
import React, { useEffect } from 'react';
import Calculator from './Calculator'; // Import your Calculator component
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log('Is Authenticated:', isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
        }
    }, [isAuthenticated, navigate]);


    const handleLogout = () => {
        dispatch(logout());
        navigate('/Login');
        // Redirect to login page
    };

    return (
        <div>
        {isAuthenticated ? (
            <>
                <Calculator />
                <button onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <p>Please login to view this page.</p>
        )}
    </div>
    );
};

export default Dashboard;





