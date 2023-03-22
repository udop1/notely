import { Box, Button, Container } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

const Settings = () => {
    const { /*user,*/ logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <NavBar />
            <Container>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </Container>
        </Box>
    );
};

export default Settings;