import { Box, Button, Container, Toolbar, styled } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

const Settings = () => {
    const { /*user,*/ logout } = UserAuth();

    const navigate = useNavigate();

    const [toggleDrawer, setToggleDrawer] = useState(true);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            console.log('You are logged out');
        } catch (error) {
            console.log(error);
        }
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: '-250px',
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    return (
        <Box className="desktop-navbar-container" sx={{ display: "flex" }}>
            <NavBar toggleDrawer={toggleDrawer} setToggleDrawer={() => setToggleDrawer(!toggleDrawer)} />
            <Box className="desktop-undernav-content" component={Main} open={toggleDrawer} sx={{ flexGrow: 1, mt: 2 }}>
                <Toolbar className="desktop-undernav-toolbar" />

                <Container>
                    <Button variant="contained" onClick={handleLogout}>Logout</Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Settings;