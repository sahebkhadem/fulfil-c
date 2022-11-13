const passwordValidator = (password, type = "register") => {
	if (!password) return "Please enter a password";

	if (password.length < 8 && type !== "login") return "Password must have more than 8 characters";

	return "";
};

export default passwordValidator;
