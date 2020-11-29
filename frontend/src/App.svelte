<script>
	import { onMount } from "svelte";

	import CodeViewer from "./code-viewer/CodeViewer.svelte";

	let lines = [];
	let title = "";
	let scroll;
	let repos = [];
	let cursor = {
		line: 0,
		char: Infinity,
	};
	let socket;
	const editSpeed = 0;

	function sleep(time) {
		return new Promise((res, rej) => {
			setTimeout(res, time);
		});
	}

	onMount(() => {
		socket = io("localhost:3000");
		socket.on("connect", () => {});
		socket.on("repos", (newRepos) => {
			repos = newRepos;
		});
		socket.on("commit", async (commit) => {
			for (let file of commit.files) {
				if (file.name == 'LICENSE')
					continue;
				let patch = file.content;
				title = file.name;
				lines = patch.reduce((arr, element) => {
					if (element.old != null) arr.push(element.old);
					return arr;
				}, []);

				cursor.line = 0;
				scroll();
				let linesToDelete = 0;
				await sleep(0);
				for (let i = 0; i < patch.length; ) {
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
						lines.splice(cursor.line, 0, "");
						for (let c of patch[i].new) {
							lines[cursor.line] += c;
							if (c == " ") continue;
							await sleep(editSpeed);
						}
						cursor.line++;
						i++;
					} else {
						i++;
						cursor.line++;
					}
				}
				socket.emit("next_patch");
			}
			socket.emit('commit', commit.repo, commit.id);
		});
	});

	function selectRepo(repoId) {
		socket.emit("commit", repoId, null);
	}
</script>

<style>
</style>

<main class="h-screen v-screen flex flex-col">
	<div>
		<select>
			<option disabled selected>Select repo</option>
			{#each repos as repo}
				<option on:click={() => selectRepo(repo.id)} value={repo.id}>
					{repo.name}
				</option>
			{/each}
		</select>
	</div>
	<CodeViewer {title} {lines} {cursor} bind:scroll />
</main>
