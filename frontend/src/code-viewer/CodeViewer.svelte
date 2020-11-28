<script>
    import { onMount, onDestroy } from "svelte";

    export let filename = 'path/to/file.code repo/brach (username)';
    export let lines = [];
    let cursor = {
        line: 1,
        char: 1 / 0,
        element: null
    };
    let codeTable = null;
    let cursorWhite = true;
    let cursorInterval;
    let deletingLine = false;
    let deleteInterval = 0;
    let addingLine = false;
    let addInterval = 0;
    let editor = null;
    let lineToAdd = "";
    let offset = 0;
    const editSpeed = 50;
    const scrollSpeed = '1s';

    onMount(() => {
        cursorInterval = setInterval(() => {
            cursorWhite = !cursorWhite;
        }, 500);
    });

    onDestroy(() => {
        clearInterval(cursorInterval);
        if (deletingLine) clearInterval(deleteInterval);
        if (addingLine) clearInterval(addingLine);
    });

    function lineUp() {
        cursor.line = Math.max(cursor.line - 1, 0);
    }

    function lineDown() {
        cursor.line = Math.min(cursor.line + 1, lines.length);
    }

    function deleteLine() {
        if (deletingLine || addingLine) {
            console.error(
                "You are allready deleting or adding a line, wait until it's done"
            );
            return;
        }
        deletingLine = true;
        cursor.char = Infinity;
        deleteInterval = setInterval(() => {
            if (lines[cursor.line].length == 0) {
                lines.splice(cursor.line, 1);
                lineUp();
                clearInterval(deleteInterval);
                deletingLine = false;
                return;
            }
            lines[cursor.line] = lines[cursor.line].substr(
                0,
                lines[cursor.line].length - 1
            );
        }, editSpeed);
    }

    function addLine(lineToAdd) {
        if (deletingLine || addingLine) {
            console.error(
                "You are allready deleting or adding a line, wait until it's done"
            );
            return;
        }
        addingLine = true;
        cursor.char = Infinity;
        lines.splice(cursor.line + 1, 0, "");
        lineDown();
        addingLine = setInterval(() => {
            if (lineToAdd.length == 0) {
                clearInterval(addInterval);
                addingLine = false;
                return;
            }
            lines[cursor.line] += lineToAdd[0];
            lineToAdd = lineToAdd.substr(1);
        }, editSpeed);
    }

    function scroll() {
        if (!cursor.element)
            return;
        offset = 
            cursor.element.getBoundingClientRect().top
            - codeTable.getBoundingClientRect().top
            - editor.getBoundingClientRect().height / 3;
        offset = Math.min(offset, codeTable.getBoundingClientRect().height - editor.getBoundingClientRect().height);
        offset = Math.max(offset, 0);
    }
</script>

<style>
</style>
<div>
    <button on:click={lineUp} class="border border-black m-1 p-1">up</button>
    <button on:click={lineDown} class="border border-black m-1 p-1">down</button>
    <button on:click={deleteLine} class="border border-black m-1 p-1">delete line</button>
    <input
        on:keyup={(e) => {
            if (e.key == 'Enter') {
                addLine(lineToAdd);
                lineToAdd = '';
            }
        }}
        placeholder="Add line"
        class="border border-black m-1 p-1"
        bind:value={lineToAdd} />
    <input on:blur={(e) => scroll()} type="number" bind:value={cursor.line}>
</div>
<div class="flex flex-col flex-shrink overflow-hidden">
    <h1 class="text-xl text-center bg-gray-900 text-white border-4 border-gray-700">{filename}</h1>
    <div bind:this={editor} class="overflow-hidden">
        <table bind:this={codeTable} class="relative" style="transition: top {scrollSpeed}; top: -{offset}px;">
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
                                bind:this={cursor.element}
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