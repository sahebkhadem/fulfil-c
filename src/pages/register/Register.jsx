import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAuthStatus, getAuthError, register } from "../../features/auth/authSlice";

// Components
import Form from "../../layouts/form/Form";
import { TextInput, PasswordInput } from "../../components/input/Input";
import { Submit } from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";

// Validators
import usernameValidator from "../../validators/usernameValidator";
import passwordValidator from "../../validators/passwordValidator";
import confirmPasswordValidator from "../../validators/confirmPasswordValidator";

function Register() {
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
	const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);

	const changeHandler = (event) => {
		// Clear errors
		if (event.target.name === "username" && usernameErrors) setUsernameErrors([]);
		if (event.target.name === "password" && passwordErrors) setPasswordErrors([]);
		if (event.target.name === "confirmPassword" && confirmPasswordErrors) setConfirmPasswordErrors([]);

		// Get form data
		const data = { ...formData, [event.target.name]: event.target.value };
		setFormData(data);
	};

	const passwordToggler = () => {
		setShowPassword((previousState) => !previousState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		// Validate username
		const usernameValidationError = usernameValidator(formData.username);
		if (usernameValidationError) {
			setUsernameErrors([usernameValidationError]);
			return;
		}

		// Validate password
		const passwordValidationError = passwordValidator(formData.password);
		if (passwordValidationError) {
			setPasswordErrors([passwordValidationError]);
			return;
		}

		// Validate confirm password
		const confirmPasswordValidationError = confirmPasswordValidator(formData.confirmPassword, formData.password);
		if (confirmPasswordValidationError) {
			setConfirmPasswordErrors([confirmPasswordValidationError]);
			return;
		}

		dispatch(register(formData));
	};

	useEffect(() => {
		if (authError.cause === "username") setUsernameErrors([authError.message]);
		if (authError.cause === "password") setPasswordErrors([authError.message]);
		if (authError.cause === "confirmPassword") setConfirmPasswordErrors([authError.message]);
	}, [authError]);

	return (
		<div className="page">
			<Form title="Register" submitHandler={submitHandler}>
				<TextInput name="username" changeHandler={changeHandler} label="Username" errors={usernameErrors} />
				<PasswordInput
					name="password"
					changeHandler={changeHandler}
					passwordToggler={passwordToggler}
					label="Password"
					showPassword={showPassword}
					errors={passwordErrors}
				/>
				<PasswordInput
					name="confirmPassword"
					changeHandler={changeHandler}
					passwordToggler={passwordToggler}
					label="Confirm password"
					showPassword={showPassword}
					confirm={true}
					errors={confirmPasswordErrors}
				/>

				<Submit width="full" disabled={authStatus === "pending" ? true : false}>
					{authStatus === "pending" && <Spinner size="sm" color="inverted" />}
					{authStatus === "pending" ? "Registering..." : "Register"}
				</Submit>
			</Form>
		</div>
	);
}

export default Register;
