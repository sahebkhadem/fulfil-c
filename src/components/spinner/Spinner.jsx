import PropTypes from "prop-types";

// CSS
import "./Spinner.css";

function Spinner({ size, color = "base" }) {
	return <span className={`spinner spinner-${size} spinner-${color}`}></span>;
}

Spinner.propTypes = {
	size: PropTypes.string.isRequired,
	color: PropTypes.string
};

export default Spinner;
