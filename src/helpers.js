import { useState } from "react";

export default function useDebounce() {
	const [timer, setTimer] = useState("");

	function debounce(func, delay = 1500) {
		clearTimeout(timer);

		const timeOut = setTimeout(() => func(), delay);

		setTimer(timeOut);
	}

	return debounce;
}

export function removeHTMLTags(str) {
	return str.replace(/<[^>]*>?/gm, "");
}
