import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData) => {
        const response = await axios.post('http://10.0.2.2:5000/api/auth/register', formData);
        return response.data;
    }
);

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
    const response = await axios.post('http://10.0.2.2:5000/api/auth/login', formData);
    if (response.data.success) {
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
    } else {
        console.log(response.data);

    }
    return response.data;
});

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    await AsyncStorage.removeItem('token');
    return { success: true };
});

export const checkAuth = createAsyncThunk('/auth/check-auth', async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        // Không gọi API nếu không có token
        return thunkAPI.rejectWithValue("No token found");
    }
    const response = await axios.get('http://10.0.2.2:5000/api/auth/check-auth', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder

            // điều kiện đăng ký
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null; // Đặt user là null (không đăng nhập ngay sau khi đăng ký)
                state.isAuthenticated = false; // Không xác thực (chỉ đăng ký, chưa đăng nhập)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // điều kiện đăng nhập

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // kiểm tra token 
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {

                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })

            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            // điều kiện đăng xuất

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
