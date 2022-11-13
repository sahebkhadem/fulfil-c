import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	status: "idle", // "idle" || "pending" || "fulfilled" || "rejected"
	error: { message: "", cause: "" }
};

// Register user
export const register = createAsyncThunk("user/register", async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

// Login user
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => await authService.logout());

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.status = "idle";
			state.error = { message: "", cause: "" };
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.status = "pending";
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = "fulfilled";
			})
			.addCase(register.rejected, (state, action) => {
				state.status = "rejected";
				state.error = { message: action.payload.message, cause: action.payload.cause };
			})
			.addCase(login.pending, (state) => {
				state.status = "pending";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = "fulfilled";
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "rejected";
				state.error = { message: action.payload.message, cause: action.payload.cause };
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	}
});

// Selectors
export const getUser = (state) => state.auth.user;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;

export const { reset } = authSlice.actions;

export default authSlice.reducer;
