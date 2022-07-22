class RouteManager {
  static init(app) {
    app.use("/repo", require("../Routes/repoRoute"));
    app.use("/user", require("../Routes/userRoute"));
    app.use("/log", require("../Routes/auditRoute"));
  }
}
module.exports = RouteManager;
