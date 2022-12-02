import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
	todos: [],
	localSearch: [],
	more: true,
	status: "idle", // "idle" || "pending" || "fulfilled" || "rejected"
	error: false
};

// Create todo
export const create = createAsyncThunk("todo/create", async (todo, thunkAPI) => {
	try {
		return await todoService.createTodo(
			thunkAPI.getState().auth.user.username,
			todo,
			thunkAPI.getState().auth.user.token
		);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

// Get user todos
export const getUserTodos = createAsyncThunk("todo/getUserTodos", async ({ start, query }, thunkAPI) => {
	try {
		return await todoService.getTodos(
			thunkAPI.getState().auth.user.username,
			start,
			query,
			thunkAPI.getState().auth.user.token
		);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

// Edit todo
export const edit = createAsyncThunk("todo/edit", async (todo, thunkAPI) => {
	try {
		return await todoService.editTodo(
			thunkAPI.getState().auth.user.username,
			todo,
			thunkAPI.getState().auth.user.token
		);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

// Delete todo
export const deleteTodo = createAsyncThunk("todo/delete", async (todoId, thunkAPI) => {
	try {
		return await todoService.deleteTodo(
			thunkAPI.getState().auth.user.username,
			todoId,
			thunkAPI.getState().auth.user.token
		);
	} catch (error) {
		return thunkAPI.rejectWithValue({ message: error.response.data.message, cause: error.response.data.cause });
	}
});

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = false;
		},
		addLocalTodo: (state, action) => {
			state.todos.unshift(action.payload);
		},
		deleteLocalTodo: (state, action) => {
			const id = action.payload;
			const newTodos = state.todos.filter((todo) => todo._id !== id);
			state.todos = newTodos;
		},
		updateLocalTodo: (state, action) => {
			const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
			state.todos[index] = action.payload;
		},
		resetTodos: (state) => {
			state.todos = [];
			state.localSearch = [];
			state.more = true;
			state.error = false;
		},
		search: (state, action) => {
			const results = state.todos.filter((todo) => {
				if (todo.title.includes(action.payload) || todo.tags.some((tag) => tag.includes(action.payload))) {
					return true;
				}

				return false;
			});

			state.localSearch = results;
		}
	},
	extraReducers: (builder) => {
		builder

			.addCase(create.pending, (state) => {
				state.status = "pending";
			})
			.addCase(create.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.status = "fulfilled";
			})
			.addCase(create.rejected, (state) => {
				state.status = "rejected";
				state.error = true;
			})
			.addCase(getUserTodos.pending, (state) => {
				state.status = "pending";
			})
			.addCase(getUserTodos.fulfilled, (state, action) => {
				state.todos = state.todos.concat(action.payload.todos);
				state.more = action.payload.more;
				state.status = "fulfilled";
			})
			.addCase(getUserTodos.rejected, (state) => {
				state.status = "rejected";
				state.error = true;
			})
			.addCase(edit.pending, (state) => {
				state.status = "pending";
			})
			.addCase(edit.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.status = "fulfilled";
			})
			.addCase(edit.rejected, (state) => {
				state.status = "rejected";
				state.error = true;
			})
			.addCase(deleteTodo.pending, (state) => {
				state.status = "pending";
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.status = "fulfilled";
			})
			.addCase(deleteTodo.rejected, (state) => {
				state.status = "rejected";
				state.error = true;
			});
	}
});

// Selectors
export const getTodos = (state) => state.todo.todos;
export const getLocalSearchResults = (state) => state.todo.localSearch;
export const hasMore = (state) => state.todo.more;
export const getTodosStatus = (state) => state.todo.status;
export const getTodosError = (state) => state.todo.error;

export const { resetError, addLocalTodo, deleteLocalTodo, updateLocalTodo, resetTodos, search } = todoSlice.actions;

export default todoSlice.reducer;
