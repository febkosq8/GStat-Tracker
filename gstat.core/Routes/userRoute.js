const router = require("express").Router();
const UserQuery = require("../Schemas/userQuerySchema");
router.post("/audit", (req, res) => {
	new UserQuery(req.body).save();
});
module.exports = router;
