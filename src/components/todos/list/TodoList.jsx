import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
	getTodos,
	getTodosStatus,
	getUserTodos,
	hasMore,
	resetTodos,
	search,
	getLocalSearchResults
} from "../../../features/todos/todoSlice";
import { getUser } from "../../../features/auth/authSlice";

// CSS
import "./TodoList.css";

// Components
import TodoItem from "../item/TodoItem";
import Spinner from "../../spinner/Spinner";

function TodoList() {
	const [start, setStart] = useState(0);
	const [query, setQuery] = useState("");
	const [isFirstRender, setIsFirstRender] = useState(true);

	const dispatch = useDispatch();

	const user = useSelector(getUser);
	const todos = useSelector(getTodos);
	const status = useSelector(getTodosStatus);
	const more = useSelector(hasMore);
	const localSearch = useSelector(getLocalSearchResults);

	const observer = useRef();
	const lastTodo = useCallback(
		(node) => {
			if (status === "pending") return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (
					entries[0].isIntersecting &&
					status !== "pending" &&
					more === true &&
					user !== null &&
					todos.length >= 10
				) {
					setStart((previousState) => previousState + 10);
					dispatch(getUserTodos({ start: start + 10, query }));
				}
			});

			if (node) observer.current.observe(node);
		},
		[status, dispatch, start, more, user, todos, query]
	);

	const todoSearchHandler = (event) => {
		setStart(0);
		setQuery(event.target.value);
	};

	useEffect(() => {
		if (user) {
			dispatch(resetTodos());
			dispatch(getUserTodos({ start: 0, query: "" }));
			setIsFirstRender(false);
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user && !isFirstRender) {
			dispatch(getUserTodos({ start: 0, query }));
			dispatch(resetTodos());
		}

		if (!user) {
			dispatch(search(query));
		}
	}, [dispatch, user, query]);

	return (
		<div className="list">
			<input
				type="text"
				className="search-input"
				placeholder="Search in titles or tags..."
				onChange={todoSearchHandler}
			/>

			{!todos.length && status !== "pending" ? (
				<div className="nothing">
					<p>Wow, you have nothing to do...</p>
				</div>
			) : null}

			{status === "pending" ? (
				<div className="spinner-container">
					<Spinner size="md" color="primary" />
				</div>
			) : null}

			{user &&
				todos.map((todo, index) => (
					<TodoItem
						id={todo._id}
						title={todo.title}
						main={todo.main}
						tags={todo.tags}
						color={todo.color}
						key={todo._id}
						innerRef={index + 1 === todos.length ? lastTodo : null}
					/>
				))}

			{/* Not logged in */}
			{user === null && query === ""
				? todos.map((todo, index) => (
						<TodoItem
							id={todo._id}
							title={todo.title}
							main={todo.main}
							tags={todo.tags}
							color={todo.color}
							key={todo._id}
							innerRef={index + 1 === todos.length ? lastTodo : null}
						/>
				  ))
				: null}

			{user === null && query !== ""
				? localSearch.map((todo, index) => (
						<TodoItem
							id={todo._id}
							title={todo.title}
							main={todo.main}
							tags={todo.tags}
							color={todo.color}
							key={todo._id}
							innerRef={index + 1 === todos.length ? lastTodo : null}
						/>
				  ))
				: null}
		</div>
	);
}

export default TodoList;
