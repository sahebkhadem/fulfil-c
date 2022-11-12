import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button/Button";
// Assets
import logo_light from "../../assets/img/logo_light.png";

// Redux
import { getUser, logout } from "../../features/auth/authSlice";

// CSS
import "./Navbar.css";

function Navbar() {
	const dispatch = useDispatch();

	const user = useSelector(getUser);

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

				{user ? (
					<Button className="nav-link" clickHandler={() => dispatch(logout())}>
						Logout
					</Button>
				) : (
					<Link to="/login" className="nav-link">
						Login
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
