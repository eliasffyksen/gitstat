const nodegit = require("nodegit");
const r = require('rethinkdb');
const db = require('./db')({
    host: 'localhost',
    db: 'gitstat',
});

(async () => {
    await db.connect();
    const repo = await nodegit.Repository.init("data/223d05dc-561d-46f1-af67-97eba569b08d", is_bare = 1);
    getNewCommits(repo, async (commit) => {
        await getCommitDiff(commit);
    });

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
    const repo = await nodegit.Repository.init("data/223d05dc-561d-46f1-af67-97eba569b08d", is_bare = 1);
    updateRepo(repo);
}

async function updateRepo(repo) {
    const head = await repo.getHeadCommit();

    const revwalk = repo.createRevWalk();
    revwalk.push(head);

    const commits = await revwalk.getCommitsUntil(async commit => {
        const row = await r.table('commits').get(commit.id().tostrS()).run(db.conn);
        return row == null;
    });

    for (const commit of commits) {
        const author = commit.author();
        r.table('commits').insert({
            id: commit.id().tostrS(),
            author: {
                name: author.name(),
                email: author.email(),
                time: author.when(),
            },
            files: await getCommitDiff(commit),
        }).run(db.conn);
    }
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
            const content = line.content().replace("\n", "");
            ret.push({
                old: line.oldLineno() == -1 ? null : content,
                new: line.newLineno() == -1 ? null : content,
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
