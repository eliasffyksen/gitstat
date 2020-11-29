<script>
	import { onMount } from "svelte";

	import CodeViewer from "./code-viewer/CodeViewer.svelte";

	let lines = [];
	let title = "";
	let scroll;
	let repos = [];
	let branches = [];
	let selectedRepo = null;
	let running = false;
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
		socket.on("branches", (newBranches) => {
			branches = newBranches;
		});
		socket.on("commit", async (commit) => {
			if (running) {
				console.error('RECIEVED COMMIT WHILE RUNNING!!!');
				return;
			}
			running = true;

			for (let file of commit.files) {
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
				if (!running) return;
				for (let i = 0; i < patch.length; ) {
					if (!running) return;
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
							if (!running) return;
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
							if (!running) return;
						}
						cursor.line++;
						i++;
					} else {
						i++;
						cursor.line++;
					}
				}
			}
			socket.emit("watch_commit", commit.repo, commit.id);
			running = false;
			socket.emit("ready");
		});
	});

	function selectRepo(repoId) {
		selectRepo = repoId;
		socket.emit("branches", repoId);
	}

	async function selectCommit(commit) {
		running = false;
		socket.emit("block");
		socket.emit("clear");
		socket.emit("watch_commit", selectRepo, null);
		socket.emit("ready");
	}
</script>

<style>
</style>

<main class="h-screen v-screen flex flex-col">
	<div>
		<select>
			<option disabled selected>Select repo</option>
			{#each repos as repo}
				<option on:click={() => selectRepo(repo)}>{repo}</option>
			{/each}
		</select>
		<select>
			<option disabled selected>Select branch</option>
			{#each branches as branch}
				<option on:click={() => selectCommit(branch.head)}>
					{branch.name}
				</option>
			{/each}
		</select>
	</div>
	<CodeViewer {title} {lines} {cursor} bind:scroll />
</main>
