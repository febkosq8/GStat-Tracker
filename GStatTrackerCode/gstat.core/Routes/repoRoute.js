const router = require("express").Router();
const axios = require("axios");
const repoQuery = require("../Schemas/repoQuerySchema");
router.get("/", async (req, res) => {
	const repoUrl = req.query.repoUrl;
	const response = await axios.get(`https://api.github.com/repos/${repoUrl}`);
	const data = await response.data;
	res.send(data);
});
router.get("/contributors", async (req, res) => {
	const repoUrl = req.query.repoUrl;
	const response = await axios.get(`https://api.github.com/repos/${repoUrl}/contributors`);
	const data = await response.data;
	res.send(data);
});
router.post("/audit", (req, res) => {
	new repoQuery(req.body).save();
	res.sendStatus(200);
});
module.exports = router;
