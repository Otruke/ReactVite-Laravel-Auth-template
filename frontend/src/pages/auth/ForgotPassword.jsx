"use client"
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            alert('Password reset link sent to your email.');
        } catch (error) {
            console.log(error);
            alert('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            <p>
                Remember your password? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default ForgotPassword;