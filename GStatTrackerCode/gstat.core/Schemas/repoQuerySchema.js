const { Schema, model } = require("mongoose");

const repoQuerySchema = new Schema({
  timeStamp: String,
  response: [
    {
      repoName: String,
      repoUrl: String,
      createdBy: String,
      createdAt: String,
      lastCommitOn: String,
      contributors: [{ name: String, commits: Number }],
      totalCommits: String,
    },
  ],
});

module.exports = model("RepoQuery", repoQuerySchema);
