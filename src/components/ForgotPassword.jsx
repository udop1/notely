import { React, useState } from 'react';
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
        <div>
            <div>
                <h1>Forgot Password</h1>
                <p><Link to='/signup'>Don't have an account yet? Sign Up.</Link></p>
                <p><Link to='/login'>Already have an account? Sign In.</Link></p>
            </div>
            {error && <div>{error}</div>}
            {message && <div>{message}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
                </div>
                <button disabled={loading}>Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;