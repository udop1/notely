import { Alert, Button, Card, FormLabel, Input, Sheet, Typography } from '@mui/joy';
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
        <Card variant="outlined">
            <Typography level="h1" sx={{marginBottom: 3}}>Create your account</Typography>
            {error && <Alert color="danger">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Sheet sx={{marginBottom: 3}}>
                    <FormLabel>Username</FormLabel>
                    <Input required onChange={(e) => setUsername(e.target.value)} type="text"></Input>
                </Sheet>

                <div>
                    <FormLabel>Email Address</FormLabel>
                    <Input required onChange={(e) => setEmail(e.target.value)} type="email"></Input>
                </div>
                <div>
                    <FormLabel>Password</FormLabel>
                    <Input required onChange={(e) => setPassword(e.target.value)} type="password"></Input>
                </div>
                <div>
                    <FormLabel>Password Confirmation</FormLabel>
                    <Input required onChange={(e) => setPasswordConfirm(e.target.value)} type="password"></Input>
                </div>
                <Button type="submit" loading={loading}>Sign Up</Button>
            </form>

            <div>
                <Typography level="body1"><Link to='/login'>Already have an account? Sign In.</Link></Typography>
            </div>
        </Card>
    );
};

export default Signup;