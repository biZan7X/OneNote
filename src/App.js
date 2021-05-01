//& firebase
import firebase from "./firebase/config";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
//& components
import DashBoard from "./Dashboard";
//& logos
import google from "./icons/google.png";
import onenotelogo from "./icons/onenotelogo.png";
//& styles
import "./App.css";

const App = () => {
	const [user] = useAuthState(auth);

	const signInGoogle = () => {
		auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	};

	const renderComponent = () => {
		if (user) return <DashBoard auth={auth} />;
		else
			return (
				<div className="landing-page">
					<img src={onenotelogo} alt="onenote" />
					<button onClick={signInGoogle} className="signinbtn">
						sign in with <img src={google} alt="google" />{" "}
					</button>
				</div>
			);
	};

	return <>{renderComponent()}</>;
};

export default App;
