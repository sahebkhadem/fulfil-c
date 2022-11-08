import PropTypes from "prop-types";

// CSS
import "./Form.css";

function Form({ submitHandler = () => {}, title = "Form", children }) {
	return (
		<div className="form-container">
			<h1>{title}</h1>
			<form onSubmit={submitHandler}>{children}</form>
		</div>
	);
}

Form.propTypes = {
	submitHandler: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.node
};

export default Form;
