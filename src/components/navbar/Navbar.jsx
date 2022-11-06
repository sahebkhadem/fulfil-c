import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

// Assets
import logo_light from "../../assets/img/logo_light.png";

// CSS
import "./Navbar.css";

function Navbar() {
	return (
		<nav>
			<Link to="/">
				<img src={logo_light} alt="Fulful logo" className="logo" />
			</Link>

			{/* Links */}
			<div className="nav-links">
				<a
					href="https://github.com/TakaoIsDaBest/fulfil-c"
					target="_blank"
					rel="noopener noreferrer"
					className="nav-link"
				>
					<FaGithub />
				</a>
				<Link to="/login" className="nav-link">
					Login
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
