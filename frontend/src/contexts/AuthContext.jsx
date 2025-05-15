import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize user state from localStorage if available
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Initialize token state from localStorage if available
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Update localStorage whenever user or token changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Set the token in localStorage and axios headers
    const setAuthToken = (token) => {
        setToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Clear the token and user from localStorage and axios headers
    const clearAuthToken = () => {
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const login = async (credentials) => {
        try {
            
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/login', credentials);
            setUser(response.data.user);
            setAuthToken(response.data.token);
            
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/register', userData);
            if (response && response.data) {
                setUser(response.data.user);
                setAuthToken(response.data.token);
                return response; // Return the response for handling in the component
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
            clearAuthToken();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const forgotPassword = async (email) => {
        try {
            await api.get('/sanctum/csrf-cookie');
            await api.post('/forgot-password', { email });
        } catch (error) {
            console.error('Forgot password failed:', error);
            throw error;
        }
    };

    const resetPassword = async (data) => {
        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/reset-password', data);
            return response.data;
        } catch (error) {
            console.error('Reset password failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);