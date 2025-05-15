import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_LARAVEL_BASE_URL,
    withCredentials: true, // Required for Sanctum cookies
});

const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api; 