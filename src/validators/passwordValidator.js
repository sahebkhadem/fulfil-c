const passwordValidator = (password) => {
	if (!password) return "Please enter a password";

	if (password.length < 8) return "Password must have more than 8 characters";

	return "";
};

export default passwordValidator;
