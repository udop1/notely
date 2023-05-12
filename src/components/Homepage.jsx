import { Box, Container } from "@mui/material";
import React from 'react';
import Header from "./Header";

const Homepage = () => {
    return (
        <Box>
            <Header />
            <Container>
                <div>Homepage</div>
            </Container>
        </Box>
    );
};

export default Homepage;