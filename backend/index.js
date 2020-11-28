const nodegit = require("nodegit");
const fs = require('fs');
const db = require('./db')({
    host: 'localhost',
    db: 'gitstat',
});

const url = "https://github.com/hfreeb/hafos";
const name = "hafos";

(async () => {
    await db.connect();
    checkRepos();
})();

async function addRepo(id, url) {
    const repo = await nodegit.Clone(url, "data/" + id);
    await getNewCommits(repo, async (commit) => {
        await processCommit(commit);
    });
}

async function checkRepos() {
    const cursor = await db.getRepos();
}

async function processCommit(commit) {
    const diffs = await commit.getDiff();
    for (const diff of diffs) {
        const patches = await diff.patches();
        for (const patch of patches) {
            //console.log("file " + patch.oldFile().path() + " -> " + patch.newFile().path());
            const hunks = await patch.hunks();
            for (const hunk of hunks) {
                const lines = await hunk.lines();
                for (const line of lines) {
                    //console.log("line " + line.oldLineno() + " -> " + line.newLineno());
                    //console.log(line.content());
                }
            }
        }
    }
}


async function getNewCommits(repo, callback, oldCommit = null) {
    const head = await repo.getHeadCommit();
    const revwalk = await nodegit.Revwalk.create(repo);
    revwalk.push(head);
    if (oldCommit != null) {
        revwalk.hide(oldCommit);
    }

    let commits = await revwalk.getCommits();
    while (commits.length > 0) {
        for (const commit of commits) {
            callback(commit);
        }

        commits = await revwalk.getCommits();
    }
}
