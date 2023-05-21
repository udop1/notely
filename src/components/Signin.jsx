import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Grid container columns={12} className="desktop-side-view-grid" sx={{ height: "100vh" }}>
            <Grid item xs={6} sm={0} className="desktop-side-view" sx={{ height: "inherit" }}>
                <img src="./DesktopSideGreen.svg" alt="Desktop Side Green" style={{ display: "block", objectFit: "cover", width: "100%", height: "100%" }}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Header />
                <Container className="desktop-form-view" sx={{ display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "center", flexDirection: "column", height: "calc(100vh - 88px)" }}>
                    <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Log In</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>Welcome back! Please enter your details.</Typography>

                    <Stack spacing={2}>
                        {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}

                        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                            <Stack spacing={4} sx={{ mb: 2 }}>
                                <TextField required label="Email Address" variant="standard" onChange={(e) => setEmail(e.target.value)} type="email"></TextField>
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
                            </Stack>
                            <Typography display="flex" justifyContent="flex-end"><Link to='/forgot-password'>Forgot Password?</Link></Typography>
                            <LoadingButton type="submit" loading={loading} variant="contained" sx={{ "&&": { py: 1.5 } }}>Log In</LoadingButton>
                        </Stack>
                        {/* <Divider>Or Login with</Divider> */}
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            {/* <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            <Card variant="outlined" sx={{ px: "30px", py: "15px" }}>
                                <CardActionArea component={Link} to={"#"}>
                                    <CardContent sx={{ p: 0 }}>
                                        <img src="./IconFacebook.png" alt="Facebook" loading="lazy" style={{ height: 35 }} />
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
                        </Stack> */}
                            <Typography variant="body1">Don't have an account yet? <Link to='/signup'>Sign Up</Link></Typography>
                        </Box>
                    </Stack>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Signin;