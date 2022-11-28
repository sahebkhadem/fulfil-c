import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

// CSS
import "./Home.css";

// Components
import TodoForm from "../../components/todos/form/TodoForm";
import TodoList from "../../components/todos/list/TodoList";
import { Button } from "../../components/button/Button";

function Home() {
	const [showButton, setShowButton] = useState(false);

	const scrollToTopButtonToggler = () => {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			setShowButton(true);
			return;
		}

		setShowButton(false);
	};

	const scrollToTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	useEffect(() => {
		window.addEventListener("scroll", scrollToTopButtonToggler);
	}, []);

	return (
		<main className="page">
			<TodoForm />

			<TodoList />

			{/* Back to top button */}
			{showButton && (
				<Button styles="scroll-to-top" clickHandler={scrollToTop}>
					<FaArrowUp />
				</Button>
			)}
		</main>
	);
}

export default Home;
