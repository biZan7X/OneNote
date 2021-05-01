import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import useDebounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const Editor = ({
	selectedNote,
	selectedNoteIndex,
	notes,
	noteUpdate,
	classes,
}) => {
	//* states
	const [text, setText] = useState(selectedNote.body);
	const [title, setTitle] = useState(selectedNote.title);
	const [id, setId] = useState(selectedNote.id);

	//* debouncer
	const update = useDebounce();

	//* selectedNote changes
	useEffect(() => {
		setTitle(selectedNote.title);
		setText(selectedNote.body);
		setId(selectedNote.id);
	}, [selectedNote.id]);

	//* DRY
	const callbackFunc = () => {
		noteUpdate(id, {
			title: title,
			body: text,
		});
	};

	const updateBody = async (val) => {
		await setText(val); //^ updating the component state
		update(callbackFunc); //^ updating the firestore
	};

	const updateTitle = async (txt) => {
		await setTitle(txt); //^ updating the component state
		update(callbackFunc); //^ updating the firestore
	};

	return (
		<div className={classes.editorContainer}>
			<BorderColorIcon className={classes.editIcon}></BorderColorIcon>
			<input
				className={classes.titleInput}
				placeholder="Note title..."
				value={title ? title : ""}
				onChange={(e) => updateTitle(e.target.value)}
			/>
			<ReactQuill value={text} onChange={updateBody}></ReactQuill>
		</div>
	);
};

export default withStyles(styles)(Editor);
