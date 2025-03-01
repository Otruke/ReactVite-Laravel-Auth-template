import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../axios';

const CheckEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendEmail = async () => {
        try {
            const response = await api.post('/email/resend', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend verification email.');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Check Your Email</h2>
            <p>
                We've sent a verification link to your email address. Please check your inbox (or spam folder) to complete your registration.
            </p>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleResendEmail}>Resend Verification Email</button>
            <p>
                Already verified your email? <a href="/login">Log in</a>
            </p>
        </div>
    );
};

export default CheckEmail;

