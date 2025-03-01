"use client"
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user && <p>Welcome, {user.name}!</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;