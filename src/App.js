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
		db.collection("notes").onSnapshot((serverUpdate) => {
			const notesTemp = serverUpdate.docs.map((_doc) => {
				const data = _doc.data();
				data["id"] = _doc.id;
				return data;
			});
			console.log(notesTemp);
			setNotes(notesTemp);
		});
	}, []);

	const selectNote = (note, index) => {
		setSelectedNote(note);
		setSelectedNoteIndex(index);
	};

	const noteUpdate = (id, noteObj) => {
		db.collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	return (
		<div className="app-container">
			<Sidebar
				notes={notes}
				selectedNoteIndex={selectedNoteIndex}
				selectNote={selectNote}
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
