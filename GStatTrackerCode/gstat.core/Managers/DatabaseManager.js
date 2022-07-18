const mongoose = require("mongoose");
class DatabaseManager {
	static init() {
		var dbURL = "mongodb+srv://febkosq8:febin8991@cluster0.7cagkwb.mongodb.net/?retryWrites=true&w=majority";
		mongoose.connect(dbURL);
		mongoose.connection.on("open", () => {
			console.log("Connected to database");
		});
	}
}
module.exports = DatabaseManager;
