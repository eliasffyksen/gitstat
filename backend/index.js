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
    const repo = await nodegit.Repository.init("data/223d05dc-561d-46f1-af67-97eba569b08d", is_bare=1);
    getNewCommits(repo, async (commit) => {
        console.log(JSON.stringify(await getCommitDiff(commit), null, 2));
    });
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

async function getCommitDiff(commit) {
    const files = [];

    const diffs = await commit.getDiffWithOptions({
        contextLines: 2000,
    });

    for (const diff of diffs) {
        const patches = await diff.patches();
        for (const patch of patches) {
            const content = await getFileDiff(patch);
            files.push({
                name: patch.newFile().path(),
                content: content,
            });
        }
    }

    return files;
}

async function getFileDiff(patch) {
    const ret = [];

    const hunks = await patch.hunks();
    for (const hunk of hunks) {
        const lines = await hunk.lines();

        for (const line of lines) {
            ret.push({
                old: line.oldLineno() == - 1 ? null : line.content(),
                new: line.newLineno() == -1 ? null : line.content(),
            });
        }
    }

    return ret;
}


async function getNewCommits(repo, callback, oldCommit = null) {
    const head = await repo.getHeadCommit();
    const revwalk = repo.createRevWalk();
    revwalk.push(head);
    if (oldCommit != null) {
        revwalk.hide(oldCommit);
    }

    let commits = await revwalk.getCommits();
    while (commits.length > 0) {
        for (const commit of commits) {
            await callback(commit);
        }

        commits = await revwalk.getCommits();
    }
}
