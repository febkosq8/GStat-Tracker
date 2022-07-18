class APIHandler {
	static async getUserRepoList(userName) {
		const response = await fetch(`https://api.github.com/users/${userName}/repos`);
		const data = await response.json();
		return data;
	}
	static async getRepoMetadata(repoUrl) {
		const response = await fetch(`https://api.github.com/repos/${repoUrl}`);
		const data = await response.json();
		return data;
	}
	static async getRepoContributors(repoUrl) {
		const response = await fetch(`https://api.github.com/repos/${repoUrl}/contributors`);
		const data = await response.json();
		return data;
	}
	static async auditUserQuery(userQuery) {
		await fetch(`http://localhost:3030/user/audit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userQuery)
		});
	}
}
export default APIHandler;
