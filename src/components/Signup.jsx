import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
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
            await createUser(email, password);
            setLoading(true);
            navigate('/account');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <div>
            <div>
                <h1>Create your account</h1>
                <p><Link to='/'>Already have an account? Sign In.</Link></p>
            </div>
            {error && <div>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password"></input>
                </div>
                <div>
                    <label>Password Confirmation</label>
                    <input onChange={(e) => setPasswordConfirm(e.target.value)} type="password"></input>
                </div>
                <button disabled={loading}>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;