const router = require("express").Router();
const UserQuery = require("../Schemas/userQuerySchema");
const axios = require("axios");
router.get("/repos", async (req, res) => {
	const userName = req.query.user;
	const response = await axios.get(`https://api.github.com/users/${userName}/repos`);
	const data = await response.data;
	res.send(data);
});
router.post("/audit", (req, res) => {
	new UserQuery(req.body).save();
	res.sendStatus(200);
});
module.exports = router;
