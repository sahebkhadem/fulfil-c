import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSave, FaExclamationCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

// Redux
import { getUser } from "../../../features/auth/authSlice";
import { resetError, getTodosStatus, getTodosError, updateLocalTodo, edit } from "../../../features/todos/todoSlice";

// CSS
import "./TodoEditor.css";

// Components
import { Button, ColorButton, Submit } from "../../button/Button";
import Spinner from "../../spinner/Spinner";

function TodoEditor({ id, title, main, tags, color, cancelEditing }) {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		_id: id,
		title,
		main,
		tags,
		color
	});
	const [textColor, setTextColor] = useState("dark");
	const [isValid, setIsValid] = useState(true);

	const isLoggedIn = useSelector(getUser);
	const todoStatus = useSelector(getTodosStatus);
	const todoError = useSelector(getTodosError);

	const changeHandler = (event) => {
		// Clear errors
		setIsValid(true);
		dispatch(resetError());

		// Get todo form data
		const data = { ...formData, [event.target.name]: event.target.value };
		setFormData(data);
	};

	const setColor = (color) => {
		setFormData({ ...formData, color: color });
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (!formData.title && !formData.main) {
			setIsValid(false);
			return;
		}

		if (!isLoggedIn) {
			dispatch(updateLocalTodo(formData));
			cancelEditing();
			return;
		}

		dispatch(edit(formData));
		cancelEditing();
	};

	useEffect(() => {
		if (color === "black") setTextColor("light");
		if (color === "white") setTextColor("dark");
	}, [color]);

	return (
		<form onSubmit={submitHandler} className={`edit-form bg-${color}`}>
			<input
				type="text"
				name="title"
				placeholder="Title"
				defaultValue={title}
				className={`edit-title-input text-${textColor}`}
				onChange={changeHandler}
			/>

			<span className="separator"></span>

			<textarea
				name="main"
				cols="30"
				rows="5"
				defaultValue={main}
				className={`edit-todo-input scrollbar text-${textColor}`}
				onChange={changeHandler}
			></textarea>

			<span className="separator"></span>

			<input
				type="text"
				name="tags"
				defaultValue={tags.constructor === Array ? tags.join(" ") : tags}
				className={`edit-tags-input text-${textColor}`}
				onChange={changeHandler}
			/>

			<span className="separator"></span>

			<div className="colors scrollbar">
				<div className="colors-wrapper">
					<ColorButton isSelcted={formData.color === "black"} colorSetter={() => setColor("black")} />
					<ColorButton
						color="white"
						isSelcted={formData.color === "white"}
						colorSetter={() => setColor("white")}
					/>
					<ColorButton
						color="gray"
						isSelcted={formData.color === "gray"}
						colorSetter={() => setColor("gray")}
					/>
					<ColorButton color="red" isSelcted={formData.color === "red"} colorSetter={() => setColor("red")} />
					<ColorButton
						color="yellow"
						isSelcted={formData.color === "yellow"}
						colorSetter={() => setColor("yellow")}
					/>
					<ColorButton
						color="green"
						isSelcted={formData.color === "green"}
						colorSetter={() => setColor("green")}
					/>
					<ColorButton
						color="blue"
						isSelcted={formData.color === "blue"}
						colorSetter={() => setColor("blue")}
					/>
					<ColorButton
						color="purple"
						isSelcted={formData.color === "purple"}
						colorSetter={() => setColor("purple")}
					/>
				</div>
			</div>

			<span className="separator"></span>

			{!isValid && (
				<div className="error-message">
					<FaExclamationCircle />
					<p>You can't save an empty note! Even just the title is enough.</p>
				</div>
			)}

			{todoError && (
				<div className="error-message">
					<FaExclamationCircle />
					<p>Sorry. Something went wrong.</p>
				</div>
			)}

			<div className="edit-actions">
				<Button color="secondary" icon={<AiFillCloseCircle />} clickHandler={cancelEditing}>
					Cancel
				</Button>
				<Submit icon={todoStatus === "pending" ? "" : <FaSave />} disabled={todoStatus === "pending"}>
					{todoStatus === "pending" && <Spinner size="sm" color="inverted" />}
					{todoStatus === "pending" ? "Saving..." : "Save"}
				</Submit>
			</div>
		</form>
	);
}

TodoEditor.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	main: PropTypes.string,
	tags: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	color: PropTypes.string,
	cancelEditing: PropTypes.func
};

export default TodoEditor;
