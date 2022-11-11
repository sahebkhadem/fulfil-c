const usernameValidator = (username) => {
	if (!username) return "Please enter a username";

	const regex = /^[0-9a-zA-Z_.-]+$/;
	if (!regex.test(username)) return "Username can only be composed only of numbers, letters, and _, ., - characters";

	return "";
};

export default usernameValidator;
