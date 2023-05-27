// Signup component - ADAM
// Imports
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Container, TextField, Typography, Stack, Box, FormControl, InputLabel, Input, InputAdornment, IconButton, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
    // Variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { createUser } = UserAuth();

    const navigate = useNavigate();

    // When the user is attempting to create a new account, make sure that the password and confirmation match then run the createUser function.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (passwordConfirm !== password) {
            return setError('Passwords do not match');
        }

        try {
            setLoading(true);
            await createUser(email, password, username);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }

        setLoading(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Grid container columns={12} className="desktop-pre-side-view-grid" sx={{ height: "100vh" }}>
            <Grid item xs={6} sm={0} className="desktop-pre-side-view" sx={{ height: "inherit" }}>
                <img src="./DesktopSideOrange.svg" alt="Desktop Side Orange" style={{ display: "block", objectFit: "cover", width: "100%", height: "100%" }}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Header backgroundColor={"transparent"} marginTop={16} />
                <Container className="desktop-pre-form-view" sx={{ display: "flex", flexWrap: "wrap", alignContent: "stretch", justifyContent: "center", flexDirection: "column", height: "calc(100vh - 208px)" }}>
                    <Box className="desktop-pre-form-box" margin="auto" width="75%">
                        <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Create an account</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>First step to creating greatness.</Typography>

                        <Stack spacing={2}>
                            {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}

                            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                                <Stack spacing={4} sx={{ mb: 2 }}>
                                    <TextField required variant="standard" label="Username" onChange={(e) => setUsername(e.target.value)} type="text"></TextField>
                                    <TextField required variant="standard" label="Email Address" onChange={(e) => setEmail(e.target.value)} type="email"></TextField>
                                    <FormControl required variant="standard" onChange={(e) => setPassword(e.target.value)} type="password">
                                        <InputLabel>Password</InputLabel>
                                        <Input type={showPassword ? "text" : "password"} endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                    <FormControl required variant="standard" onChange={(e) => setPasswordConfirm(e.target.value)} type="password">
                                        <InputLabel>Password Confirmation</InputLabel>
                                        <Input type={showPassword ? "text" : "password"} endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                </Stack>
                                <LoadingButton type="submit" loading={loading} variant="contained" sx={{ "&&": { py: 1.25 } }}>Sign Up</LoadingButton>
                            </Stack>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Typography variant="body1">Already have an account? <Link to='/login'>Login</Link></Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Signup;