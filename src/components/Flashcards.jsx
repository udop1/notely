import { Box, Container } from "@mui/material";
import React from 'react';
import NavBar from "./NavBar";

const Flashcards = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <div>Flashcards</div>
            </Container>
        </Box>
    );
};

export default Flashcards;