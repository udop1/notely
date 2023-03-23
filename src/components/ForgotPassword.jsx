import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ForgotPassword = () => {
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Container>
                <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Forgot Password?</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>Don't worry, it happens! Please enter the email associated with your account.</Typography>

                <Stack spacing={2}>
                    {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}
                    {message && <Alert severity="success"><AlertTitle><strong>Success</strong></AlertTitle>{message}</Alert>}

                    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                        <TextField required label="Email Address" onChange={(e) => setEmail(e.target.value)} type="email"></TextField>
                        <LoadingButton type="submit" loading={loading} variant="contained">Reset Password</LoadingButton>
                    </Stack>
                    <Typography variant="body1">Remember your password? <Link to='/login'>Login</Link></Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default ForgotPassword;