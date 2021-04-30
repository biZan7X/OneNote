import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebarItem/SidebarItem";

const Sidebar = ({ notes, selectedNoteIndex, selectNote, classes }) => {
	const [addingNote, setAddingNote] = useState(false);
	const [title, setTitle] = useState(null);

	const newNoteBtnClick = () => {
		setTitle(null);
		setAddingNote(!addingNote);
	};

	const updateTitle = (txt) => {
		setTitle(txt);
	};

	const newNote = () => {
		console.log(addingNote, title);
	};

	//const selectNote = () => console.log("select note");
	const deleteNote = () => console.log("delete note");

	if (notes)
		return (
			<div className={classes.sidebarContainer}>
				<Button className={classes.newNoteBtn} onClick={newNoteBtnClick}>
					{addingNote ? "cancel" : "new note"}
				</Button>
				{addingNote ? (
					<>
						<input
							type="text"
							className={classes.newNoteInput}
							placeholder="enter the note title"
							onKeyUp={(e) => {
								updateTitle(e.target.value);
							}}
						/>
						<Button
							className={classes.newNoteSubmitBtn}
							onClick={newNote}
						>
							Submit Note
						</Button>
					</>
				) : null}
				<List>
					{notes.map((note, index) => {
						return (
							<div key={index}>
								<SidebarItem
									note={note}
									index={index}
									selectedNoteIndex={selectedNoteIndex}
									selectNote={selectNote}
									deleteNote={deleteNote}
								></SidebarItem>
								<Divider></Divider>
							</div>
						);
					})}
				</List>
			</div>
		);
	else return <div className=""></div>;
};

export default withStyles(styles)(Sidebar);
