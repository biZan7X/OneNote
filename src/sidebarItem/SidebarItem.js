import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

const SidebarItem = ({
	index,
	selectedNoteIndex,
	note,
	classes,
	selectNote,
	deleteNote,
}) => {
	const selectNotes = (n, i) => selectNote(n, i);
	const deleteNotes = (n) => {
		if (window.confirm(`are you sure , you wanna delete : ${note.title}`))
			deleteNote(n);
	};

	return (
		<div key={index}>
			<ListItem
				className={classes.listItem}
				selected={selectedNoteIndex === index}
				alignItems="flex-start"
			>
				<div
					className={classes.textSection}
					onClick={() => selectNotes(note, index)}
				>
					<ListItemText
						primary={note.title}
						secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
					></ListItemText>
				</div>
				<DeleteIcon
					onClick={() => deleteNotes(note)}
					className={classes.deleteIcon}
				></DeleteIcon>
			</ListItem>
		</div>
	);
};

export default withStyles(styles)(SidebarItem);
