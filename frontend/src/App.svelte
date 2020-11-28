<script>
	import { onMount } from 'svelte';

	import CodeViewer from './code-viewer/CodeViewer.svelte';

	let lines = [];
	let title = '';
	let cursor = {
		line: 0,
		char: Infinity
	};
	let socket;

	onMount(() => {
		socket = io('localhost:3000');
		socket.on('connect', () => {
			socket.emit('repo', 'linux-kernel');
		});
		socket.on('patch', (newTitle, patch) => {
			lines = patch.reduce((arr, element) => {
				if (element.old)
					arr.push(element.old);
				return arr;
			}, []);

			cursor.line = 0;
			for (let line of patch) {
				if (line.old == null) {
					deleteLine();
				}
				cursor.line++;
			}
		});
	});
	let deleteLine;
</script>

<main class="h-screen v-screen flex flex-col">
	<CodeViewer {title} {lines} {cursor} bind:deleteLine={deleteLine}></CodeViewer>
</main>

<style>
</style>