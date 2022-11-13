import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// Components
import Navbar from "./components/navbar/Navbar";

function App() {
	return (
		<Router>
			<div className="app">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
