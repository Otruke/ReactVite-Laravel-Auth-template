import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert('Passwords do not match.');
            return;
        }
        try {
            const response = await register({ name, email, password, password_confirmation: passwordConfirmation });
            if (response && response.data) {
                const data = response.data;
                if (data.redirect === '/login') {
                    // User already registered and verified
                    navigate('/login', { state: { message: 'You already have an account. Please login instead.' } });
                } else if (data.redirect === '/check-email') {
                    // User registered but not verified
                    navigate('/check-email', { state: { email } });
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
            const errors = error.response?.data?.redirect;
            
            if (errors === '/login') {
                // User already registered and verified
                navigate('/login', { state: { message: 'You already have an account. Please login instead.' } });
            } else if (errors === '/check-email') {
                // User registered but not verified
                navigate('/check-email', { state: { email } });
            }


        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;