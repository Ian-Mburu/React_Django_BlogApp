// Importing the useAuthStore hook from the '../store/auth' file to manage authentication state
import { useAuthStore } from "../Store/Auth";

// Importing the axios library for making HTTP requests
import axios from "./axios";

// Importing jwt_decode to decode JSON Web Tokens
import { jwtDecode } from 'jwt-decode';

// Importing the Cookies library to handle browser cookies
import Cookies from "js-cookie";

// Importing Swal (SweetAlert2) for displaying toast notifications
import Swal from "sweetalert2";

// Configuring global toast notifications using Swal.mixin
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// Function to handle user login
export const login = async (email, password) => {
    try {
        // Making a POST request to obtain user tokens
        const { data, status } = await axios.post("user/token/", {
            email,
            password,
        });

        // If the request is successful (status code 200), set authentication user and display success toast
        if (status === 200) {
            setAuthUser(data.access, data.refresh);

            // Displaying a success toast notification
            Toast.fire({
                icon: "success",
                title: "Signed in successfully",
            });
        }

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error.response.data?.detail || "Something went wrong",
        };
    }
};

// Function to handle user registration
export const register = async (full_name, email, password, password2) => {
    try {
        // Making a POST request to register a new user
        const { data } = await axios.post("user/register/", {
            full_name,
            email,
            password,
            password2,
        });

        // Logging in the newly registered user and displaying success toast
        await login(email, password);

        // Displaying a success toast notification
        Toast.fire({
            icon: "success",
            title: "Signed Up Successfully",
        });

        // Returning data and error information
        return { data, error: null };
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error.response.data || "Something went wrong",
        };
    }
};

// Function to handle user logout
export const logout = () => {
    // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    useAuthStore.getState().setUser(null);

    // Displaying a success toast notification
    Toast.fire({
        icon: "success",
        title: "You have been logged out.",
    });
};

// Function to set the authenticated user on page load
export const setUser = async () => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");
    const authStore = useAuthStore.getState();

    if (!accessToken || !refreshToken) {
        authStore.setLoading(false);
        return;
    }

    try {
        if (isAccessTokenExpired(accessToken)) {
            const response = await getRefreshToken();
            setAuthUser(response.access, response.refresh);
        } else {
            setAuthUser(accessToken, refreshToken);
        }
    } catch (error) {
        authStore.setLoading(false);
        authStore.setUser(null);
        console.error("Token refresh failed:", error);
    }
};

// Function to set the authenticated user and update user state
export const setAuthUser = (access_token, refresh_token) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Store tokens in cookies
    Cookies.set("access_token", access_token, { secure: true });
    Cookies.set("refresh_token", refresh_token, { secure: true });

    // Also store in localStorage for immediate access
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    try {
        const user = jwtDecode(access_token);
        useAuthStore.getState().setUser(user);
    } catch (error) {
        console.error("Token decoding error:", error);
        useAuthStore.getState().setUser(null);
    }
    
    useAuthStore.getState().setLoading(false);
};

// Function to refresh the access token using the refresh token
export const getRefreshToken = async () => {
    try {
        const refresh_token = Cookies.get("refresh_token");
        if (!refresh_token) {
            throw new Error("No refresh token available");
        }
        
        const response = await axios.post("user/token/refresh/", {
            refresh: refresh_token
        });
        
        return response.data;
    } catch (error) {
        // Clear invalid tokens and logout user
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        useAuthStore.getState().setUser(null);
        throw error; // Re-throw to handle in calling function
    }
};

// Function to check if the access token is expired
export const isAccessTokenExpired = (accessToken) => {
    try {
        // Decoding the access token and checking if it has expired
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        // Returning true if the token is invalid or expired
        return true;
    }
};