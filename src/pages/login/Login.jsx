import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAuthStatus, getAuthError, login, reset } from "../../features/auth/authSlice";

// Components
import Form from "../../layouts/form/Form";
import { TextInput, PasswordInput } from "../../components/input/Input";
import { LinkButton, Submit } from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";

// Validators
import usernameValidator from "../../validators/usernameValidator";
import passwordValidator from "../../validators/passwordValidator";

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authStatus = useSelector(getAuthStatus);
	const authError = useSelector(getAuthError);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [usernameErrors, setUsernameErrors] = useState([]);
	const [passwordErrors, setPasswordErrors] = useState([]);

	const changeHandler = (event) => {
		// Clear errors
		if (event.target.name === "username" && usernameErrors) setUsernameErrors([]);
		if (event.target.name === "password" && passwordErrors) setPasswordErrors([]);

		// Get form data
		const data = { ...formData, [event.target.name]: event.target.value };
		setFormData(data);
	};

	const passwordToggler = () => {
		setShowPassword((previousState) => !previousState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		// Validate form
		const usernameValidationError = usernameValidator(formData.username, "login");
		const passwordValidationError = passwordValidator(formData.password, "login");
		if (usernameValidationError || passwordValidationError) {
			// Validate username
			if (usernameValidationError) {
				setUsernameErrors([usernameValidationError]);
			}

			// Validate password
			if (passwordValidationError) {
				setPasswordErrors([passwordValidationError]);
			}

			return;
		}

		dispatch(login(formData));
	};

	useEffect(() => {
		if (authStatus === "fulfilled") dispatch(reset());
	}, [authStatus, dispatch]);

	useEffect(() => {
		if (localStorage.getItem("user")) navigate("/");
	}, [navigate, authStatus]);

	useEffect(() => {
		if (authError.cause === "username") setUsernameErrors([authError.message]);
		if (authError.cause === "password") setPasswordErrors([authError.message]);
	}, [authError]);

	return (
		<main className="page">
			<Form title="Login" submitHandler={submitHandler}>
				<TextInput name="username" changeHandler={changeHandler} label="Username" errors={usernameErrors} />
				<PasswordInput
					name="password"
					changeHandler={changeHandler}
					passwordToggler={passwordToggler}
					label="Password"
					showPassword={showPassword}
					errors={passwordErrors}
				/>

				<Submit width="full" disabled={authStatus === "pending" ? true : false}>
					{authStatus === "pending" && <Spinner size="sm" color="inverted" />}
					{authStatus === "pending" ? "Logging in..." : "Login"}
				</Submit>

				<LinkButton to="/register" color="secondary" width="full">
					Don't have an account?
				</LinkButton>
			</Form>
		</main>
	);
}

export default Register;
