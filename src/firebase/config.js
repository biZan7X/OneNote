import firebase from "firebase/app";

import "firebase/firestore";

firebase.initializeApp({
	apiKey: "AIzaSyDnyJcDbClNgHvoXEHghzwJCYzPQDUz5Eo",
	authDomain: "evernote-92c82.firebaseapp.com",
	projectId: "evernote-92c82",
	storageBucket: "evernote-92c82.appspot.com",
	messagingSenderId: "548862053724",
	appId: "1:548862053724:web:0dee1de7eaf4aac0508599",
});

export const db = firebase.firestore();
export default firebase;
