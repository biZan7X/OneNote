import React, { useState } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Editor extends React.Component {
	constructor() {
		super();
		this.state = { text: "", title: "", id: "" };
	}

	componentDidMount = () => {
		this.setState({
			title: this.props.selectedNote.title,
			text: this.props.selectedNote.body,
			id: this.props.selectedNote.id,
		});
	};

	//* gets invoked when we select a new note
	componentDidUpdate = () => {
		if (this.props.selectedNote.id !== this.state.id) {
			this.setState({
				title: this.props.selectedNote.title,
				text: this.props.selectedNote.body,
				id: this.props.selectedNote.id,
			});
		}
	};

	updateBody = async (val) => {
		await this.setState({ text: val });
		this.update();
	};

	updateTitle = async (txt) => {
		await this.setState({ title: txt });
		this.update();
	};

	update = debounce(() => {
		this.props.noteUpdate(this.state.id, {
			title: this.state.title,
			body: this.state.text,
		});
	}, 2000);

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.editorContainer}>
				<BorderColorIcon className={classes.editIcon}></BorderColorIcon>
				<input
					className={classes.titleInput}
					placeholder="Note title..."
					value={this.state.title ? this.state.title : ""}
					onChange={(e) => this.updateTitle(e.target.value)}
				/>
				<ReactQuill
					value={this.state.text}
					onChange={this.updateBody}
				></ReactQuill>
			</div>
		);
	}
}

export default withStyles(styles)(Editor);
