// Header component - ADAM
// Imports
import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import React from 'react'

const Header = ({ backgroundColor, marginTop }) => {
    return (
        <AppBar position="static" className="desktop-pre-app-bar" sx={{ mt: { marginTop }, mb: 3, backgroundColor: { backgroundColor } }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="../IconLogo.svg" alt="Notely Logo" loading="lazy" style={{ marginRight: 10, height: "40px" }} />
                    <Typography variant="h5" sx={{ fontFamily: "DKSmilingCat", letterSpacing: 2, color: "#5D6716" }}>notely</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;