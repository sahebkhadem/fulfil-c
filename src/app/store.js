import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todos/todoSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
	reducer: { auth: authReducer, todo: todoReducer, theme: themeReducer }
});
