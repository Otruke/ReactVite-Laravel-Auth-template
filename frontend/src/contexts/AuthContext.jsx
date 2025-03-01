import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Set the token in localStorage and axios headers
    const setAuthToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token); // Update the token state
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Clear the token from localStorage and axios headers
    const clearAuthToken = () => {
        localStorage.removeItem('token');
        setToken(null); // Clear the token state
        delete api.defaults.headers.common['Authorization'];
    };

    const login = async (credentials) => {
        try {
            // Fetch CSRF token before making the login request
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/login', credentials);
            setUser(response.data.user);
            setAuthToken(response.data.token); // Save the token
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            // Fetch CSRF token before making the register request
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/register', userData); // Ensure the correct endpoint
            if (response && response.data) {
                setUser(response.data.user);
                setAuthToken(response.data.token); // Save the token
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
            setUser(null);
            clearAuthToken(); // Clear the token
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