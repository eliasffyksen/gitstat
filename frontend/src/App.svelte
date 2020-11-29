<script>
	import { onMount } from "svelte";

	import CodeViewer from "./code-viewer/CodeViewer.svelte";

	let lines = [];
	let scoreboard = [];
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
		for (let user of scoreboard) {
			if (user.name == name) {
				user.points++;
				scoreboard = scoreboard.sort((a, b) => {
					return a.points < b.points;
				});
				return;
			}
		}
		scoreboard.push({ name, points: 1 });
		scoreboard = scoreboard.sort((a, b) => {
			return a.points < b.points;
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
				console.error("RECIEVED COMMIT WHILE RUNNING!!!");
				return;
			}
			running = true;
			let filen = 0;
			for (let file of commit.files) {
				let patch = file.content;
				title = file.name;
				lines = patch.reduce((arr, element) => {
					let str = "";
					let add = false;
					for (let e of element) {
						if (typeof e == "string") {
							add = true;
							str += e;
						} else if (e.old != null) {
							add = true;
							str += e.old;
						}
					}
					// if (element.old != null) arr.push(element.old);
					if (add) arr.push(str);
					return arr;
				}, []);
				console.log(lines);
				cursor.line = 0;
				cursor.char = Infinity;
				// await sleep(100);
				// scroll();
				progress = 0;
				for (let i = 0; i < patch.length; ) {
					progress = i / patch.length;
					if (!running) return;

					cursor.char = 0;
					console.log(patch[i]);
					for (let e of patch[i]) {
						// scroll();
						if (typeof(e) == "string") {
							cursor.char += e.length;
						} else if (e.new == null) {
							cursor.char = Infinity;
							while (lines[cursor.line].length > 0) {
								// scroll();
								lines[cursor.line] = lines[cursor.line].substr(
									0,
									lines[cursor.line].length - 1
								);
								await sleep(editSpeed);
							}
							lines.splice(i, 1);
							cursor.line--;
							lines = [...lines];
							break;

						} else if (e.old == null) {
							cursor.char = Infinity;
							lines.splice(cursor.line, 0, '');
							await sleep(editSpeed);
							while (e.new.length > 0) {
								// scroll();
								lines[cursor.line] += e.new.substr(0, 1);
								e.new = e.new.substr(1);
								await sleep(editSpeed);
							}
							lines = [...lines];
							break;
						} else {
							console.log(i, cursor.line, patch[i]);
							lines = [...lines];
							return;
						}
					}
					cursor.line++;
					i++;
					// if (patch[i].new == null) {
					// 	linesToDelete++;
					// 	cursor.line++;
					// 	i++;
					// } else if (linesToDelete > 0) {
					// 	scroll();
					// 	cursor.line--;
					// 	while (lines[cursor.line].length > 0) {
					// 		lines[cursor.line] = lines[cursor.line].substr(
					// 			0,
					// 			lines[cursor.line].length - 1
					// 		);
					// 		await sleep(editSpeed / 2);
					// 		if (!running) return;
					// 	}
					// 	lines.splice(cursor.line, 1);
					// 	linesToDelete--;
					// } else if (patch[i].old == null) {
					// 	scroll();
					// 	lines.splice(cursor.line, 0, "");
					// 	for (let c of patch[i].new) {
					// 		lines[cursor.line] += c;
					// 		if (c == " ") continue;
					// 		await sleep(editSpeed);
					// 		if (!running) return;
					// 	}
					// 	await addPoint(commit.author.name);
					// 	cursor.line++;
					// 	i++;
					// } else {
					// 	i++;
					// 	cursor.line++;
					// }
				}
				// if (filen == 1)
				// 	return;
				// filen++;
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
		socket.emit(
			"watch_commit",
			"hafos",
			"20117fe14e404a5a2648ac96fadba00df2e98dbf"
		);
		socket.emit("ready");
	}
</script>

<style>
</style>

<main
	class="flex"
	style="position: fixed; top: 0; bottom: 0; left: 0; right: 0;">
	<div
		class="flex flex-col overflow-hidden"
		style="flex-basis: 0; flex-grow: 1; flex-shrink: 1;">
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
		{#each scoreboard as user}
			<div>{user.name}: {user.points}</div>
		{/each}
	</div>
</main>
