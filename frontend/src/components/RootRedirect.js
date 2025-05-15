import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RootRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/'); // Stay on landing page if not logged in
    }
  }, [user, navigate]);

  return null;
};

export default RootRedirect;