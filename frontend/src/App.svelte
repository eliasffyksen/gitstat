<script>
	import { onMount } from "svelte";

	import CodeViewer from "./code-viewer/CodeViewer.svelte";

	let lines = [];
	let scoreboard = {data: []};
	let title = "";
	let progress = 0;
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
	
	async function addPoint(name) {
		for (let user of scoreboard.data) {
			if (user.name == name) {
				user.points++;
				scoreboard = {data: scoreboard.data};
				return;
			}
		}
		scoreboard.data.push({name, points: 1});
		scoreboard = {data: scoreboard.data};
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
				console.error("RECIEVED COMMIT WHILE RUNNING!!!");
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
				progress = 0;
				for (let i = 0; i < patch.length; ) {
					progress = i / patch.length;
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
						await addPoint(commit.author.name);
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
		selectedRepo = repoId;
		socket.emit("branches", repoId);
	}

	async function selectCommit(commit) {
		running = false;
		socket.emit("block");
		socket.emit("clear");
		socket.emit("watch_commit", selectedRepo, commit);
		socket.emit("ready");
	}
</script>

<style>
</style>

<main class="flex" style="position: fixed; top: 0; bottom: 0; left: 0; right: 0;">
	<div class="flex flex-col overflow-hidden" style="flex-basis: 0; flex-grow: 1; flex-shrink: 1;">
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
				<option on:click={() => selectCommit(null)}>
					From begining
				</option>
			</select>
		</div>
		<div
			class="flex m-1 bg-gray-700 rounded-lg overflow-hidden h-4"
			style="flex-shrink: 0;">
			<div class="bg-green-600" style="flex-basis: {progress * 100}%">
				&nbsp;
			</div>
		</div>
		<CodeViewer {title} {lines} {cursor} bind:scroll />
	</div>
	<div style="flex-basis: 30rem;flex-shrink: 0;">
		<h1 class="text-xl mt-4">Scoreboard:</h1>
		{#each scoreboard.data as user}
			<div>{user.name}: {user.points}</div>
		{/each}
	</div>
</main>
