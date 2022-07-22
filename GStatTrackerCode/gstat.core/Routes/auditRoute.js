const router = require("express").Router();
const RepoQuery = require("../Schemas/repoQuerySchema");
const UserQuery = require("../Schemas/userQuerySchema");

router.get("/user", async (req, res) => {
	const data = await UserQuery.find();
	res.send(data);
});
router.get("/repo", async (req, res) => {
	const data = await RepoQuery.find();
	res.send(data);
});

module.exports = router;
