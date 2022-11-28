import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

// Redux
import { getUser } from "../../../features/auth/authSlice";
import { deleteLocalTodo, deleteTodo } from "../../../features/todos/todoSlice";

// CSS
import "./TodoItem.css";

// Components
import TodoEditor from "../editor/TodoEditor";

function TodoItem({ id, title, main, tags, color }) {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(getUser);

	const [textColor, setTextColor] = useState("dark");
	const [isEditing, setIsEditing] = useState(false);

	const cancelEditing = () => {
		setIsEditing(false);
	};

	const deleteHandler = () => {
		if (!isLoggedIn) {
			dispatch(deleteLocalTodo(id));
			return;
		}

		dispatch(deleteTodo(id));
	};

	useEffect(() => {
		if (color === "black") setTextColor("light");
		if (color === "white") setTextColor("dark");
	}, [color]);

	if (isEditing) {
		return <TodoEditor id={id} title={title} main={main} tags={tags} color={color} cancelEditing={cancelEditing} />;
	}

	return (
		<div className={`todo-container bg-${color} text-${textColor}`} onClick={() => setIsEditing(true)}>
			<div className="title-bar">
				<h1>{title}</h1>
				<div className="action-buttons">
					<button className={`delete-btn text-${textColor}`} onClick={deleteHandler}>
						<FaTrashAlt />
					</button>
				</div>
			</div>

			{main && <p>{main}</p>}

			{tags.constructor === Array && <div className="tags-container">{tags.map((tag) => `${tag} `)}</div>}
		</div>
	);
}

TodoItem.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	main: PropTypes.string,
	tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	color: PropTypes.string
};

export default TodoItem;
