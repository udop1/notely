import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>User Email: {user && user.email}</p>
            <p>Username: {user && user.displayName}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;