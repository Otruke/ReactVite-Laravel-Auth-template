import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const EmailVerified = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const verifyUrl = new URLSearchParams(location.search).get('verify_url');

        if (verifyUrl) {
            // Send a request to the backend to verify the email
            axios.get(verifyUrl)
                .then(response => {
                    // Log the user in using the token returned from the backend
                    const { token, user } = response.data;
                    login({ token, user });

                    // Redirect to the dashboard
                    navigate('/dashboard');
                })
                .catch(error => {
                    // Redirect to an error page if verification fails
                    navigate('/verification-error');
                    console.error('Verification failed:', error);
                });
        }
    }, [location, navigate, login]);

    return <div>Verifying your email...</div>;
};

export default EmailVerified;