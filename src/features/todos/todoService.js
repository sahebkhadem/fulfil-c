import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

// Create new goal
const createTodo = async (username, todo, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(`${BASE_URL}/${username}/todos/create`, todo, config);

	return response.data;
};

// Get user todos
const getTodos = async (username, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(`${BASE_URL}/${username}/todos`, config);

	return response.data;
};

// Edit todo
const editTodo = async (username, todo, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.patch(`${BASE_URL}/${username}/todos/${todo._id}`, todo, config);

	return response.data;
};

// Delete todo
const deleteTodo = async (username, todoId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.delete(`${BASE_URL}/${username}/todos/${todoId}`, config);

	return response.data;
};

const goalServic = {
	createTodo,
	getTodos,
	editTodo,
	deleteTodo
};

export default goalServic;
