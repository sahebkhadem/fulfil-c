import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getUser } from "../../../features/auth/authSlice";
import { getTodos, getAll, getTodosStatus } from "../../../features/todos/todoSlice";

// CSS
import "./TodoList.css";

// Components
import TodoItem from "../item/TodoItem";
import Spinner from "../../spinner/Spinner";

function TodoList() {
	const dispatch = useDispatch();

	const user = useSelector(getUser);
	const todos = useSelector(getTodos);
	const status = useSelector(getTodosStatus);

	useEffect(() => {
		if (user) {
			dispatch(getAll(user.username));
		}
	}, [user, dispatch]);

	if (status === "pending") {
		return (
			<div className="spinner-container">
				<Spinner size="md" />
			</div>
		);
	}

	if (!todos.length) {
		return (
			<div className="nothing">
				<p>Wow, you have nothing to do...</p>
			</div>
		);
	}

	return (
		<div className="list">
			{todos.map((todo) => (
				<TodoItem
					id={todo._id}
					title={todo.title}
					main={todo.main}
					tags={todo.tags}
					color={todo.color}
					key={todo._id}
				/>
			))}
		</div>
	);
}

export default TodoList;
