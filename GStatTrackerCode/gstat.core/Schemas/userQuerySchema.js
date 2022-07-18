const { Schema, model } = require("mongoose");

const userQuerySchema = new Schema({
	userId: String,
	timeStamp: String,
	response: [
		{
			repoName: String,
			repoUrl: String,
			repoDescription: String
		}
	]
});
module.exports = model("UserQuery", userQuerySchema);
