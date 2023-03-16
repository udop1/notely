import { Box, Container } from "@mui/material";
import React from 'react';
import NavBar from "./NavBar";

const Todo = () => {
    return (
        <Box>
            <NavBar />
            <Container>
                <div>To-do</div>
            </Container>
        </Box>
    );
};

export default Todo;