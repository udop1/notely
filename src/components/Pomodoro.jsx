import { Box, Container } from "@mui/material";
import React from 'react';
import NavBar from "./NavBar";

const Pomodoro = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <div>Pomodoro Timer</div>
            </Container>
        </Box>
    );
};

export default Pomodoro;