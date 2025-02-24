// Import the Axios library to make HTTP requests. Axios is a popular JavaScript library for this purpose.
import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired } from './auth';
import Cookies from 'js-cookie';

// Create an instance of Axios and store it in the 'apiInstance' variable. This instance will have specific configuration options.
const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add request interceptor
apiInstance.interceptors.request.use(async (config) => {
    let accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (accessToken) {
        if (isAccessTokenExpired(accessToken)) {
            try {
                const response = await axios.post('/api/v1/user/token/refresh/', {
                    refresh: refreshToken
                });
                
                accessToken = response.data.access;
                Cookies.set('access_token', accessToken);
                config.headers.Authorization = `Bearer ${accessToken}`;
            } catch (error) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default apiInstance