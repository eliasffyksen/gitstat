<script>
	import { onMount } from "svelte";

	import CodeViewer from "./code-viewer/CodeViewer.svelte";

	let lines = [];
	let title = "";
	let cursor = {
		line: 0,
		char: Infinity,
	};
	let socket;
	const editSpeed = 50;

	function sleep(time) {
		return new Promise((res, rej) => {
			setTimeout(res, time);
		});
	}

	onMount(() => {
		socket = io("localhost:3000");
		socket.on("connect", () => {
			socket.emit("repo", "linux-kernel");
		});
		socket.on("patch", async (newTitle, patch) => {
			title = newTitle;
			lines = patch.reduce((arr, element) => {
				if (element.old) arr.push(element.old);
				return arr;
			}, []);

			cursor.line = 0;
			let linesToDelete = 0;
			await sleep(1000);
			lines = [...lines];
			for (let i = 0; i < patch.length;) {
				if (patch[i].new == null) {
					linesToDelete++;
					cursor.line++;
					i++;
				} else if (linesToDelete > 0) {
					scroll();
					cursor.line--;
					while (lines[cursor.line].length > 0) {
						lines[cursor.line] = lines[cursor.line].substr(
							0,
							lines[cursor.line].length - 1
						);
						await sleep(editSpeed / 2);
					}
					lines.splice(cursor.line, 1);
					linesToDelete--;
				} else if (patch[i].old == null) {
					scroll();
					lines.splice(cursor.line, 0, '');
					for (let c of patch[i].new) {
						lines[cursor.line] += c;
						if (c == ' ')
							continue;
						await sleep(editSpeed);
					}
					cursor.line++;
					i++;
				} else {
					i++;
					cursor.line++;
				}
			}
		});
	});
	let scroll;
</script>

<style>
</style>

<main class="h-screen v-screen flex flex-col">
	<CodeViewer {title} {lines} {cursor} bind:scroll={scroll} />
</main>
