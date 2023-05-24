import { Box, Button, Container, Toolbar } from "@mui/material";
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
        <Box className="desktop-navbar-container" sx={{ display: "flex" }}>
            <NavBar />
            <Box className="desktop-undernav-content" sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />

                <Container>
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Settings;