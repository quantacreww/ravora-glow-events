import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logo from "./assets/logo.jpg";

// Set favicon to logo (works in dev and build via Vite asset handling)
const ensureFavicon = () => {
	let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (!link) {
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.type = "image/jpeg";
	link.href = logo;
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
