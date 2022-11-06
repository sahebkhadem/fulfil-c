import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Home from "./pages/home/home/Home";

// Components
import Navbar from "./components/navbar/Navbar";

function App() {
	return (
		<Router>
			<div className="app">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
