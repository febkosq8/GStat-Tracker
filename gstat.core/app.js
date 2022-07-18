const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const DatabaseManager = require("./Managers/DatabaseManager");
const RouteManager = require("./Managers/RouteManager");
app.use(bodyParser.json());
app.use(cors());
app.listen(3030, () => {
	console.log("Server started at port 3030");
	DatabaseManager.init();
	RouteManager.init(app);
});
