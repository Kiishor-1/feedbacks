import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../services/api";
import axios from "axios";

const { LOGIN_REGISTER, LOGOUT_USER } = AUTH_ENDPOINTS;

export const isTokenExpired = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const now = Date.now() / 1000;
        return payload.exp < now;
    } catch (error) {
        console.error('Error during checking token expiration:', error);
        return true;
    }
};

export const loginOrRegister = createAsyncThunk('auth/loginOrRegister', async (credentials, { rejectWithValue }) => {
    const toastId = toast.loading('Processing request...');
    try {
        const response = await axios.post(LOGIN_REGISTER, { ...credentials });

        if (!response?.data?.success) {
            toast.dismiss(toastId);
            toast.error(response?.data?.error || 'Failed to login or register');
            return rejectWithValue(response?.data?.error || 'Failed to login or register');
        }

        toast.dismiss(toastId);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error(error?.response?.data?.error || 'Error during login/register');
        return rejectWithValue(error?.response?.data?.error || 'Error during login/register');
    }
});

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;

            if (!token) {
                return rejectWithValue('No token provided, user is not logged in');
            }
            const response = await axios.post(LOGOUT_USER, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(response)

            if (response.data?.success) dispatch(logout());
            toast.success('User logged out successfully');
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error(error.response?.data?.error || 'Failed to logout');
            return rejectWithValue(error?.response?.data?.error || 'Failed to logout');
        }
    }
);

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token") || null;
};

const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role") || null;
};

const initialState = {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
    role: getRoleFromLocalStorage(),
    error: null,
    isLoading: false,
    status: 'idle',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null; 
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginOrRegister.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginOrRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user.role;
                state.status = 'succeed';
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("role", action.payload.user.role);
            })
            .addCase(loginOrRegister.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error;
                state.status = 'failed';
            });

        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.status = 'succeed';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error;
                state.status = 'failed';
            });
    },
});

export const { setIsLoading, logout } = authSlice.actions;
export default authSlice.reducer;
