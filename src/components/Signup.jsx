import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Card, CardContent, Container, TextField, Typography, Stack } from '@mui/material';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3 }}>Create your account</Typography>
                    <Stack spacing={2}>
                        {error && <Alert severity="error"><AlertTitle><strong>Error</strong></AlertTitle>{error}</Alert>}

                        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                            <TextField required label="Username" onChange={(e) => setUsername(e.target.value)} type="text"></TextField>
                            <TextField required label="Email Address" onChange={(e) => setEmail(e.target.value)} type="email"></TextField>
                            <TextField required label="Password" onChange={(e) => setPassword(e.target.value)} type="password"></TextField>
                            <TextField required label="Password Confirmation" onChange={(e) => setPasswordConfirm(e.target.value)} type="password"></TextField>
                            <LoadingButton type="submit" loading={loading} variant="contained">Sign Up</LoadingButton>
                        </Stack>

                        <div>
                            <Typography variant="body1"><Link to='/login'>Already have an account? Sign In.</Link></Typography>
                        </div>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Signup;