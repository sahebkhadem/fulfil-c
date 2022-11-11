const confirmPasswordValidator = (confirm, password) => {
	if (!confirm) return "Please enter your password again";

	if (confirm !== password) return "Passwords do not match";

	return "";
};

export default confirmPasswordValidator;
