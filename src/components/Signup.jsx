import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Container, TextField, Typography, Stack, Box, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { createUser } = UserAuth();

    const navigate = useNavigate();

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
        <Box /*display="flex" justifyContent="center" alignItems="center" minHeight="100vh"*/>
            <Header />
            <Container>
                <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>Create an account</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>First step to creating greatness.</Typography>

                <Stack spacing={2}>
                    {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}

                    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
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
                        <LoadingButton type="submit" loading={loading} variant="contained" sx={{ "&&": { mx: 3 } }}>Sign Up</LoadingButton>
                    </Stack>
                    {/* <Divider>Or Register with</Divider> */}
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        {/* <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
                        </Stack> */}
                        <Typography variant="body1">Already have an account? <Link to='/login'>Login</Link></Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Signup;