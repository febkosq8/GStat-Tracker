const router = require("express").Router();
const axios = require("axios");
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
module.exports = router;
