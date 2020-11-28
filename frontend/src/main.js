import App from './App.svelte';
import "tailwindcss/dist/tailwind.min.css";

const app = new App({
	target: document.body,
	props: {
		name: 'GitStat'
	}
});

export default app;