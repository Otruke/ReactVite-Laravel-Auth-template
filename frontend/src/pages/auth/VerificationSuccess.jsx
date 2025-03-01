import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to dashboard after 30 seconds
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 5000); // 5 seconds

        return () => clearTimeout(timer); // Cleanup timer
    }, [navigate]);

    return (
        <div>
            <h2>Email Verification Successful!</h2>
            <p>You will be redirected to your dashboard shortly...</p>
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
    );
};

export default VerificationSuccess;