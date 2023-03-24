import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Card, CardActionArea, CardContent, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signIn(email, password);
            setLoading(true);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <Box sx={{ mt: 5 }} /*display="flex" justifyContent="center" alignItems="center" minHeight="100vh"*/>
            <Container>
                <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Login</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>We are glad to see you back! Please enter your email and password.</Typography>

                <Stack spacing={2}>
                    {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}

                    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                        <TextField required label="Email Address" onChange={(e) => setEmail(e.target.value)} type="email"></TextField>
                        <TextField required label="Password" onChange={(e) => setPassword(e.target.value)} type="password"></TextField>
                        <Typography display="flex" justifyContent="flex-end"><Link to='/forgot-password'>Forgot Password?</Link></Typography>
                        <LoadingButton type="submit" loading={loading} variant="contained">Login</LoadingButton>
                    </Stack>
                    <Divider>Or Login with</Divider>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            <Card variant="outlined">
                                <CardActionArea component={Link} to={"#"}>
                                    <CardContent>
                                        Facebook
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card variant="outlined">
                                <CardActionArea component={Link} to={"#"}>
                                    <CardContent>
                                        Google
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card variant="outlined">
                                <CardActionArea component={Link} to={"#"}>
                                    <CardContent>
                                        Apple
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Stack>
                        <Typography variant="body1">Don't have an account yet? <Link to='/signup'>Sign Up</Link></Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Signin;