import { useNavigate } from 'react-router-dom';

const InvalidToken = () => {
    const navigate = useNavigate();

    const handleRequestNewLink = () => {
        navigate('/forgot-password'); // Redirect to the forgot password page
    };

    return (
        <div>
            <h2>Invalid or Expired Token</h2>
            <p>
                The password reset link you used is invalid or has expired. Please request a new link below.
            </p>
            <button onClick={handleRequestNewLink}>Request New Reset Link</button>
        </div>
    );
};

export default InvalidToken;