import { AppBar, Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import React, { useState } from 'react'
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { user } = UserAuth();

    const [toggleDrawer, setToggleDrawer] = useState(true);

    const drawer = (
        <Box sx={{ width: 250 }}>
            <List sx={{ pt: 0 }}>
                <ListItem sx={{ backgroundColor: "#DBE192", py: 1 }}>
                    <img className="desktop-hide-logo" src="../IconLogo.svg" alt="Notely Logo" loading="lazy" style={{ marginRight: 10, height: "40px", visibility: "hidden" }} />
                    <Typography className="desktop-hide-logo" variant="h5" sx={{ flexGrow: 1, fontFamily: "DKSmilingCat", letterSpacing: 2, color: "#5D6716", visibility: "hidden" }}>notely</Typography>
                    <IconButton onClick={() => setToggleDrawer(!toggleDrawer)} size="large" edge="end" color="inherit" sx={{ ml: 2, transform: "rotate(180deg)" }}>
                        <ArrowForwardIosRoundedIcon />
                    </IconButton>
                </ListItem>
            </List>
            <List>
                <ListItem sx={{ mb: 1 }}>
                    <ListItemIcon>
                        <Avatar alt={user && user.displayName} src={user && user.photoURL} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="h6" sx={{ fontWeight: "700" }}>{user && user.displayName}</Typography>
                    </ListItemText>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/dashboard" selected={window.location.pathname === "/dashboard"}>
                        <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/settings" selected={window.location.pathname === "/settings"}>
                        <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/todos" selected={window.location.pathname === "/todos"}>
                        <ListItemIcon><ListRoundedIcon /></ListItemIcon>
                        <ListItemText primary="To-do list" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/notes" selected={window.location.pathname === "/notes"}>
                        <ListItemIcon><DescriptionOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/whiteboards" selected={window.location.pathname === "/whiteboards"}>
                        <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
                        <ListItemText primary="Whiteboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/flashcards" selected={window.location.pathname === "/flashcards"}>
                        <ListItemIcon><StyleOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Flashcards" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/pomodoro" selected={window.location.pathname === "/pomodoro"}>
                        <ListItemIcon><TimerOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Pomodoro Timer" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "inherit" }}>
            <AppBar className="desktop-navbar-appbar" position="fixed">
                <Toolbar>
                    <IconButton onClick={() => setToggleDrawer(!toggleDrawer)} size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <MenuRoundedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="../IconLogo.svg" alt="Notely Logo" loading="lazy" style={{ marginRight: 10, height: "40px" }} />
                        <Typography variant="h5" sx={{ fontFamily: "DKSmilingCat", letterSpacing: 2, color: "#5D6716" }}>notely</Typography>
                    </Box>
                    <IconButton size="large" edge="end" color="inherit" sx={{ ml: 2, visibility: "hidden" }}>
                        <SearchRoundedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer variant="temporary" sx={{ width: 250, display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250, overflowX: "hidden" } }} anchor="left" open={!toggleDrawer} onClose={() => setToggleDrawer(!toggleDrawer)} ModalProps={{ keepMounted: true }}>
                {drawer}
            </Drawer>

            <Drawer variant="persistent" sx={{ width: 250, display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250, overflowX: "hidden" } }} anchor="left" open={toggleDrawer} onClose={() => setToggleDrawer(!toggleDrawer)}>
                {drawer}
            </Drawer>
        </Box>
    )
}

export default NavBar;