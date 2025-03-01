"use client"
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { resetPassword } = useAuth();
    const { token } = useParams(); // Extract token from URL parameters
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email'); // Extract email from query parameters
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert('Passwords do not match.');
            return;
        }
        
        try {
            await resetPassword({ email, token, password, password_confirmation: passwordConfirmation });
            alert('Password reset successfully. You can now login.');
            navigate('/login');
        } catch (error) {
            console.log(error);
            alert('Failed to reset password. Please try again.');
            const errors = error.response?.data?.redirect;

            if (errors === '/invalid-token') {
                // User already registered and verified
                navigate('/invalid-token');
            } 
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;