<script>
    import { onMount, onDestroy } from "svelte";
import App from "../App.svelte";

    export let title = 'path/to/file.code repo/brach (username)';
    export let lines = [];
    export let cursor;
    let cursorElement = null;
    let codeTable = null;
    let cursorWhite = true;
    let cursorInterval;
    let editor = null;
    let offset = 0;
    const scrollSpeed = '1s';

    onMount(() => {
        cursorInterval = setInterval(() => {
            cursorWhite = !cursorWhite;
        }, 500);
    });

    onDestroy(() => {
        clearInterval(cursorInterval);
    });

    export function scroll() {
        if (!cursorElement) {
            offset = 0;
            return;
        }
        offset = 
            cursorElement.getBoundingClientRect().top
            - codeTable.getBoundingClientRect().top
            - editor.getBoundingClientRect().height / 2;
        // offset = Math.min(offset, codeTable.getBoundingClientRect().height - editor.getBoundingClientRect().height);
        // offset = Math.max(offset, 0);
    }
</script>

<style>
</style>
<div class="flex flex-col flex-shrink flex-grow overflow-hidden bg-gray-900">
    <h1 class="text-xl text-center bg-gray-900 text-white border-4 border-gray-700">{title}</h1>
    <div bind:this={editor} class="overflow-hidden flex-grow">
        <table bind:this={codeTable} class="relative" style="top: -{offset}px;">
            {#each lines as line, lineNum}
                <tr class="text-white">
                    <td class="text-right bg-gray-700 text-yellow-500 px-1">
                        {lineNum + 1}
                    </td>
                    <td
                        class="text-left px-1 whitespace-pre"
                        class:bg-gray-700={lineNum == cursor.line}
                        class:bg-gray-900={lineNum != cursor.line}
                        width="99%">
                        {#if lineNum == cursor.line}
                            {line.substr(0, cursor.char)}<span
                                bind:this={cursorElement}
                                class="whitespace-normal"
                                class:bg-white={cursorWhite}
                                class:text-black={cursorWhite}>{line[cursor.char] || ''}{#if !line[cursor.char]}
                                    &nbsp;
                                {/if}</span>{line.substr(cursor.char + 1)}
                        {:else}{line}{/if}
                    </td>
                </tr>
            {/each}
        </table>
    </div>
</div>