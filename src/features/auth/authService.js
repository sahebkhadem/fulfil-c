import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

// Register usre
const register = async (userData) => {
	const response = await axios.post(`${BASE_URL}/register`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const authService = {
	register
};

export default authService;
