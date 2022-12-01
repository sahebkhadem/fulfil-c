import { Link } from "react-router-dom";
import { FaGithub, FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button/Button";

// Assets
import logo_light from "../../assets/img/logo_light.png";
import logo_dark from "../../assets/img/logo.png";

// Redux
import { getUser, logout, reset } from "../../features/auth/authSlice";
import { resetTodos } from "../../features/todos/todoSlice";
import { getTheme, toggleTheme } from "../../features/theme/themeSlice";

// Hooks
import useTheme from "../../hooks/theme/useTheme";

// CSS
import "./Navbar.css";

function Navbar() {
	const dispatch = useDispatch();

	const user = useSelector(getUser);
	const theme = useSelector(getTheme);

	useTheme(theme);

	return (
		<nav>
			<Link to="/">
				<img src={theme === "dark" ? logo_light : logo_dark} alt="Fulfil logo" className="logo" />
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

				<button
					className="theme-toggler"
					onClick={() => dispatch(toggleTheme())}
					title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
				>
					{theme === "dark" ? <FaSun /> : <FaMoon />}
				</button>

				{user ? (
					<Button
						clickHandler={() => {
							dispatch(logout());
							dispatch(reset());
							dispatch(resetTodos());
						}}
					>
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
