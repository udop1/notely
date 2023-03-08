import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signIn } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signIn(email, password);
            navigate('/account');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <h1>Sign in to your account</h1>
                <p><Link to='/signup'>Don't have an account yet? Sign Up.</Link></p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password"></input>
                </div>
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default Signin;