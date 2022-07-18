class RouteManager {
	static init(app) {
		app.use("/repo", require("../Routes/repoRoute"));
		app.use("/user", require("../Routes/userRoute"));
	}
}
module.exports = RouteManager;
