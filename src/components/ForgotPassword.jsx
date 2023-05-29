// Forgot Password component - ADAM
// Imports
import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";

const ForgotPassword = () => {
    // Variables
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            await resetPassword(email);
            setLoading(true);
            setMessage('Check your inbox for further instructions');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <Grid container columns={12} className="desktop-pre-side-view-grid" sx={{ height: "100vh" }}>
            <Grid item xs={6} sm={0} className="desktop-pre-side-view" sx={{ height: "inherit" }}>
                <img src="./DesktopSideGreen.svg" alt="Desktop Side Green" style={{ display: "block", objectFit: "cover", width: "100%", height: "100%" }}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Header backgroundColor={"transparent"} marginTop={16} />
                <Container className="desktop-pre-form-view" sx={{ display: "flex", flexWrap: "wrap", alignContent: "stretch", justifyContent: "center", flexDirection: "column", height: "calc(100vh - 208px)" }}>
                    <Box className="desktop-pre-form-box" margin="auto" width="75%">
                        <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Forgot Password?</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>Don't worry, it happens! Please enter the email associated with your account.</Typography>

                        <Stack spacing={2}>
                            {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
                            {message && <Alert severity="success"><AlertTitle><strong>Success</strong></AlertTitle>{message}</Alert>}

                            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                                <TextField required label="Email Address" variant="standard" onChange={(e) => setEmail(e.target.value)} type="email" sx={{ mb: 2 }}></TextField>
                                <LoadingButton type="submit" loading={loading} variant="contained" sx={{ "&&": { mt: 4, py: 1.25 } }}>Reset Password</LoadingButton>
                            </Stack>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Typography variant="body1">Remember your password? <Link to='/login'>Login</Link></Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;