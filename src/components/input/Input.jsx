import PropTypes from "prop-types";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";

// CSS
import "./Input.css";

// Text input
export function TextInput({ name = "text", changeHandler = () => {}, label = "Enter text", errors = [] }) {
	return (
		<div className="input-container">
			<input
				type="text"
				name={name}
				id={name}
				onChange={changeHandler}
				placeholder="Placeholder"
				style={errors.length > 0 ? { borderColor: "var(--color-danger)" } : {}}
			/>
			<label htmlFor={name}>{label}</label>
			{errors.length > 0 && (
				<div className="errors-container">
					{errors.map((error, index) => (
						<div className="error" key={index}>
							<FaExclamationCircle />
							<p>{error}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

TextInput.propTypes = {
	name: PropTypes.string,
	changeHandler: PropTypes.func,
	label: PropTypes.string,
	errors: PropTypes.arrayOf(PropTypes.string)
};

// Email input
export function PasswordInput({
	name = "password",
	changeHandler = () => {},
	passwordToggler = () => {},
	label = "Enter password",
	showPassword = false,
	confirm = false,
	errors = []
}) {
	return (
		<div className="input-container">
			<input
				type={showPassword ? "text" : "password"}
				name={name}
				id={name}
				onChange={changeHandler}
				placeholder="Placeholder"
				style={{ borderColor: errors.length > 0 && "var(--color-danger)" }}
				className={!confirm ? "pr" : ""}
			/>

			<label htmlFor={name}>{label}</label>

			{!confirm && (
				<button
					type="button"
					title={showPassword ? "Hide password" : "Show password"}
					onClick={passwordToggler}
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</button>
			)}

			{errors.length > 0 && (
				<div className="errors-container">
					{errors.map((error, index) => (
						<div className="error" key={index}>
							<FaExclamationCircle />
							<p>{error}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

PasswordInput.propTypes = {
	name: PropTypes.string,
	changeHandler: PropTypes.func,
	passwordToggler: PropTypes.func,
	label: PropTypes.string,
	showPassword: PropTypes.bool,
	confirm: PropTypes.bool,
	errors: PropTypes.arrayOf(PropTypes.string)
};
