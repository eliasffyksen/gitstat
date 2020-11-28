<script>
    import { onMount, onDestroy } from "svelte";

    let lines = [];
    let cursor = {
        line: 1,
        char: 1 / 0,
    };
    let cursorWhite = true;
    let cursorInterval;
    let deletingLine = false;
    let deleteInterval = 0;
    let addingLine = false;
    let addInterval = 0;
    let lineToAdd = "";
    const editSpeed = 50;

    onMount(() => {
        cursorInterval = setInterval(() => {
            cursorWhite = !cursorWhite;
        }, 500);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.text())
            .then(text => lines = text.split('\n'));
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

    function runAddLine() {
        console.log(lineToAdd);
    }
</script>

<style>
</style>

<div>
    <button on:click={lineUp} class="border border-black m-1 p-1">up</button>
    <button
        on:click={lineDown}
        class="border border-black m-1 p-1">down</button>
    <button on:click={deleteLine} class="border border-black m-1 p-1">delete
        line</button>
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
    <table>
        {#each lines as line, lineNum}
            <tr class="text-white">
                <td class="text-right bg-gray-700 text-yellow-500 px-1">
                    {lineNum + 1}
                </td>
                <td class="text-left bg-gray-900 px-1 whitespace-pre" width="99%">
                    {#if lineNum == cursor.line}
                        {line.substr(0, cursor.char)}<span
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
