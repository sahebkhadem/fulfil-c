import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getTodos, getTodosStatus, getUserTodos, hasMore, resetTodos } from "../../../features/todos/todoSlice";
import { getUser } from "../../../features/auth/authSlice";

// CSS
import "./TodoList.css";

// Components
import TodoItem from "../item/TodoItem";
import Spinner from "../../spinner/Spinner";

function TodoList() {
	const [start, setStart] = useState(0);

	const dispatch = useDispatch();

	const user = useSelector(getUser);
	const todos = useSelector(getTodos);
	const status = useSelector(getTodosStatus);
	const more = useSelector(hasMore);

	const observer = useRef();
	const lastTodo = useCallback(
		(node) => {
			if (status === "pending") return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && status !== "pending" && more === true && user !== null) {
					setStart((previousState) => previousState + 10);
					dispatch(getUserTodos(start + 10));
				}
			});

			if (node) observer.current.observe(node);
		},
		[status, dispatch, start, more, user]
	);

	useEffect(() => {
		if (user) {
			dispatch(getUserTodos(0));
		}

		dispatch(resetTodos());
	}, [dispatch, user]);

	if (!todos.length) {
		return (
			<div className="nothing">
				<p>Wow, you have nothing to do...</p>
			</div>
		);
	}

	return (
		<div className="list">
			{todos.map((todo, index) => (
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

			{status === "pending" ? (
				<div className="spinner-container">
					<Spinner size="md" />
				</div>
			) : null}
		</div>
	);
}

export default TodoList;
