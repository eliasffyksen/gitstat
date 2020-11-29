const nodegit = require("nodegit");
const r = require('rethinkdb');
const fs = require('fs');
const db = require('./db')({
    host: 'localhost',
    db: 'gitstat',
});

const getDifference = require("../algorithms/getDifference");
const lineSetter = require("../algorithms/matchLines");

const repos = require('./repos.json');

(async () => {
    await db.connect();
    loop();
})();

async function loop() {
    await checkRepos();

    setTimeout(() => loop(), 2000);
}

async function checkRepos() {
    for (const repo of repos) {
        let gitRepo;
        if (fs.existsSync("data/" + repo.name)) {
            gitRepo = await nodegit.Repository.open("data/" + repo.name);
            await gitRepo.fetch("origin");

            const currentBranch = await gitRepo.getCurrentBranch();
            await gitRepo.mergeBranches(currentBranch, "refs/remotes/origin/" + currentBranch.shorthand());
        } else {
            gitRepo = await nodegit.Clone(repo.url, "data/" + repo.name);
        }

        updateRepo(repo.name, gitRepo);
    }
}

async function updateRepo(name, repo) {
    const head = await repo.getHeadCommit();

    const revwalk = repo.createRevWalk();
    revwalk.push(head);

    const commits = await revwalk.getCommitsUntil(async commit => {
        const row = await r.table('commits').get(commit.id().tostrS()).run(db.conn);
        return row == null;
    });

    for (const commit of commits) {
        const author = commit.author();
        const parents = commit.parents().map(oid => oid.tostrS());
        const result = await r.table('commits').insert({
            id: commit.id().tostrS(),
            message: commit.message().replace("\n", ""),
            author: {
                name: author.name(),
                email: author.email(),
            },
            files: await getCommitDiff(commit),
            repo: name,
            parents: parents,
        }).run(db.conn);

        if (result.inserted) {
            console.log("Added commit " + commit.id().tostrS());
        }
    }

    const branch = await repo.getCurrentBranch();
    r.table('branches').insert({
        id: name + "-" + branch.shorthand(),
        head: branch.target().tostrS(),
    }, {
        conflict: "update",
    }).run(db.conn);
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

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const content = line.content().replace("\n", "");
            if (line.oldLineno() != -1 && line.newLineno() != -1) {
                ret.push(content);
                continue;
            }

            const added = [];
            const removed = [];
            // read block of inserts/removes until we reach an unchanged line
            while (true) {
                const content = lines[i].content().replace("\n", "");
                if (lines[i].oldLineno() == -1) {
                    added.push(content);
                } else {
                    removed.push(content);
                }

                if (i + 1 >= lines.length || (lines[i + 1].oldLineno() != -1 && lines[i + 1].newLineno() != -1)) {
                    break;
                }

                i++;
            }

            const arr = lineSetter(removed, added)

            ret.push(...arr.map(x => getDifference(x)));
        }
    }

    return ret;
}