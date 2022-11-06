import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages
import Home from "./pages/home/Home";

function App() {
	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
