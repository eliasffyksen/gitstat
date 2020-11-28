<script>
	import { onMount } from 'svelte';

	import CodeViewer from './code-viewer/CodeViewer.svelte';

	let lines = [];
	onMount(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.text())
			.then((text) => (lines = text.split("\n")));
	});

</script>

<main class="h-screen v-screen flex flex-col">
	<CodeViewer lines={lines}></CodeViewer>
</main>

<style>
</style>