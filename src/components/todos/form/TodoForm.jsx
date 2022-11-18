import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSave, FaPlus, FaExclamationCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

// Redux
import { create, getTodosStatus, getTodosError, resetError } from "../../../features/todos/todoSlice";

// CSS
import "./TodoForm.css";

// Components
import { Submit, Button, ColorButton } from "../../button/Button";
import Spinner from "../../spinner/Spinner";

function TodoForm({ isLoggedIn = false, addTodo = null }) {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		todo: "",
		tags: "",
		color: "default"
	});
	const [isValid, setIsValid] = useState(true);

	const dispatch = useDispatch();

	const todoStatus = useSelector(getTodosStatus);
	const todoError = useSelector(getTodosError);

	const toggleForm = () => {
		setFormData({
			title: "",
			main: "",
			tags: "",
			color: "default"
		});
		setIsOpen((previousState) => !previousState);
	};

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
			addTodo(formData);
			return;
		}

		dispatch(create(formData));
	};

	useEffect(() => {
		if (todoStatus !== "rejected") {
			setIsValid(true);
			dispatch(resetError());
		}
	}, [todoStatus, dispatch]);

	if (!isOpen) {
		return (
			<div className="placeholder" onClick={toggleForm}>
				<p>Add a note...</p>
				<FaPlus />
			</div>
		);
	}

	return (
		<form onSubmit={submitHandler}>
			<input type="text" name="title" placeholder="Title" className="title-input" onChange={changeHandler} />
			<span className="separator"></span>

			<textarea
				name="main"
				cols="30"
				rows="5"
				className="todo-input"
				placeholder="Add a note..."
				onChange={changeHandler}
			></textarea>
			<span className="separator"></span>

			<input
				type="text"
				name="tags"
				placeholder="Tags (sperated with a space)"
				className="tags-input"
				onChange={changeHandler}
			/>
			<span className="separator"></span>

			<div className="colors scrollbar">
				<div className="colors-wrapper">
					<ColorButton isSelcted={formData.color === "default"} colorSetter={() => setColor("default")} />
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

			<div className="action-buttons">
				<Button color="secondary" icon={<AiFillCloseCircle />} clickHandler={toggleForm}>
					Cancel
				</Button>
				<Submit icon={todoStatus === "pending" ? "" : <FaSave />}>
					{todoStatus === "pending" && <Spinner size="sm" color="inverted" />}
					{todoStatus === "pending" ? "Saving..." : "Save"}
				</Submit>
			</div>
		</form>
	);
}

TodoForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	addTodo: PropTypes.func
};

export default TodoForm;
