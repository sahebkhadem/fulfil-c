import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

// CSS
import "./Button.css";

// Normal button
export function Button({
	color = "primary",
	width = "content",
	styles = "",
	clickHandler = () => {},
	icon = null,
	disabled = false,
	children
}) {
	return (
		<button
			type="button"
			className={`button btn-${color} btn-${width} ${styles}`}
			onClick={clickHandler}
			disabled={disabled}
		>
			{icon && <span>{icon}</span>}
			{children}
		</button>
	);
}

Button.propTypes = {
	color: PropTypes.string,
	width: PropTypes.string,
	styles: PropTypes.string,
	clickHandler: PropTypes.func,
	icon: PropTypes.node,
	disabled: PropTypes.bool,
	children: PropTypes.node
};

// Submit button
export function Submit({ color = "primary", width = "content", styles = "", icon = null, disabled = false, children }) {
	return (
		<button type="submit" className={`button btn-${color} btn-${width} ${styles}`} disabled={disabled}>
			{icon && <span>{icon}</span>}
			{children}
		</button>
	);
}

Button.propTypes = {
	color: PropTypes.string,
	width: PropTypes.string,
	styles: PropTypes.string,
	icon: PropTypes.node,
	disabled: PropTypes.bool,
	children: PropTypes.node
};

// Link button
export function LinkButton({
	to = "",
	target = "",
	color = "primary",
	width = "content",
	styles = "",
	icon = null,
	disabled = false,
	children
}) {
	return (
		<Link to={to} target={target} className={`button btn-${color} btn-${width} ${styles}`} disabled={disabled}>
			{icon && <span>{icon}</span>}
			{children}
		</Link>
	);
}

LinkButton.propTypes = {
	to: PropTypes.string,
	target: PropTypes.string,
	color: PropTypes.string,
	width: PropTypes.string,
	styles: PropTypes.string,
	icon: PropTypes.node,
	disabled: PropTypes.bool,
	children: PropTypes.node
};

// Color setter button
export function ColorButton({ color = "black", isSelcted = true, colorSetter = () => {} }) {
	const setColor = () => {
		colorSetter(color);
	};

	return (
		<button type="button" className={`color-btn clr-${color}`} onClick={setColor}>
			<div className={!isSelcted ? "icon-visibility" : ""}>
				<FaCheckCircle />
			</div>
		</button>
	);
}

Button.propTypes = {
	color: PropTypes.string,
	colorSetter: PropTypes.func
};
