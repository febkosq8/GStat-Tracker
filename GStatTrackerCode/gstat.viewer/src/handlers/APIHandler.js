class APIHandler {
	static async getUserRepoList(userName) {
		const response = await fetch(`http://localhost:3030/user/repos?user=${userName}`);
		const data = await response.json();
		return data;
	}
	static async getRepoMetadata(repoUrl) {
		const response = await fetch(`http://localhost:3030/repo?repoUrl=${repoUrl}`);
		const data = await response.json();
		return data;
	}
	static async getRepoContributors(repoUrl) {
		const response = await fetch(`http://localhost:3030/repo/contributors?repoUrl=${repoUrl}`);
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
	static async auditRepoQuery(repoQuery) {
		await fetch(`http://localhost:3030/repo/audit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(repoQuery)
		});
	}
}
export default APIHandler;
