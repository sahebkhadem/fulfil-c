import PropTypes from "prop-types";
import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

// CSS
import "./Input.css";

export function TextInput({ name = "text", changeHandler = () => {}, label = "Enter text", errors = [] }) {
	return (
		<div className="input-container">
			<input
				type="text"
				name={name}
				id={name}
				onChange={changeHandler}
				placeholder="Placeholder"
				style={errors.length > 0 ? { borderColor: "var(--color-error)" } : {}}
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
