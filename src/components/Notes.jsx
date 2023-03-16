import { Box, Container } from "@mui/material";
import React from 'react';
import NavBar from "./NavBar";

const Notes = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <div>Notes</div>
            </Container>
        </Box>
    );
};

export default Notes;