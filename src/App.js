import { useEffect, useState } from "react";
import firebase from "./firebase/config";
import { db } from "./firebase/config";
//& components
import Sidebar from "./sidebar/Sidebar";
import Editor from "./editor/Editor";
import "./App.css";

const App = () => {
	const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
	const [selectedNote, setSelectedNote] = useState(null);
	const [notes, setNotes] = useState([]);

	//*componentDidMount
	useEffect(() => {
		//* read
		db.collection("notes").onSnapshot((serverUpdate) => {
			const notesTemp = serverUpdate.docs.map((_doc) => {
				const data = _doc.data();
				data["id"] = _doc.id;
				return data;
			});
			setNotes(notesTemp);
			console.log(notes);
		});
	}, []);

	const selectNote = (note, index) => {
		setSelectedNote(note);
		setSelectedNoteIndex(index);
	};

	//*create
	const newNote = async (title) => {
		const noteTemp = {
			title: title,
			body: "",
		};

		//&response from the firestore , the newly created note
		const res = await db.collection("notes").add({
			title: noteTemp.title,
			body: noteTemp.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		const newId = res.id;

		//& adding the new note in the list of notes
		await setNotes([...notes, noteTemp]);

		//TODO
		//& find the index of the new note
		const newNoteIndex = notes.indexOf(
			notes.filter((note) => note.id === newId)[0]
		);

		//& now setting the new note as the current note
		setSelectedNote(notes[newNoteIndex]);
		setSelectedNoteIndex(newNoteIndex);
	};

	//* update
	const noteUpdate = (id, noteObj) => {
		db.collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	//* delete
	//TODO : selected note
	const deleteNote = async (note) => {
		const noteIndex = notes.indexOf(note);

		//& deleting from the notes state
		await setNotes(notes.filter((noteTemp) => noteTemp !== note));

		//& if we wanna delete the current selected noted
		if (selectedNoteIndex === noteIndex) selectNote(null, null);
		else {
			if (notes.length > 1) {
				//& since the length of notes will decrease , selected note's index will decrease
				selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex);
			} else {
				selectNote(null, null);
			}
		}

		//& deleting from the firestore
		db.collection("notes").doc(note.id).delete();
	};

	return (
		<div className="app-container">
			<Sidebar
				notes={notes}
				selectedNoteIndex={selectedNoteIndex}
				selectNote={selectNote}
				newNote={newNote}
				deleteNote={deleteNote}
			></Sidebar>
			{selectedNote ? (
				<Editor
					selectedNote={selectedNote}
					selectedNoteIndex={selectedNoteIndex}
					notes={notes}
					noteUpdate={noteUpdate}
				></Editor>
			) : null}
		</div>
	);
};

export default App;
