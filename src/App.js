import { useEffect, useState } from "react";
import { db } from "./firebase/config";
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
	return <div className="App">Hello world</div>;
};

export default App;
