import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const token = localStorage.getItem('token');
const userItem = localStorage.getItem('user');
console.log('authSlice initial load - userItem:', userItem);
let user = null;
try {
  user = userItem ? JSON.parse(userItem) : null;
} catch (e) {
  console.error('Failed to parse user from localStorage:', e);
  localStorage.removeItem('user'); // Clear invalid user data
}
console.log('authSlice initial load - parsed user:', user);

const initialState = {
  user: user,
  token: token || null,
  isAuthenticated: !!token,
  isLoading: false,
  isError: false,
  message: '',
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.register(userData.name, userData.email, userData.password);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData.email, userData.password);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Login fulfilled - action.payload:', response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state) => { state.isLoading = false; })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;