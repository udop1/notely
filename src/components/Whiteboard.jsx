import { Box, Container } from "@mui/material";
import React from 'react';
import NavBar from "./NavBar";

const Whiteboard = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <div>Whiteboard</div>
            </Container>
        </Box>
    );
};

export default Whiteboard;