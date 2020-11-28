<script>
    let lines = ["abc", "123", "cool"];
    let cursor = {
        line: 2,
        char: 4
    };
    let cursorDark = false;
</script>
<div>
    <table>
    {#each lines as line, lineNum}
        <tr class="text-white">
            <td class="text-right bg-gray-700 text-yellow-500 px-1" >{lineNum + 1}</td>
            <td class="text-left bg-gray-900 px-1" width="99%">
                {#if lineNum + 1 == cursor.line}
            {line.substr(0,cursor.char)}<span
            >{line[cursor.char] || ''}{#if !line[cursor.char]}&nbsp;{/if}</span>{line.substr(cursor.char + 1)}
                {:else}
                    {line}
                {/if}
            </td>
        </tr>
    {/each}
    </table>
</div>

<style>
</style>