import React from "react";
import "./User.css";
import { useEffect } from "react";
import APIHandler from "../../handlers/APIHandler";
function User() {
	const [user, setUser] = React.useState(new URLSearchParams(document.location.search).get("username"));
	const [userRepoList, setUserRepoList] = React.useState([]);
	const userSearchFormRef = React.useRef(null);
	const userSearchInputRef = React.useRef(null);
	useEffect(() => {
		if (user) {
			userSearchInputRef.current.value = user;
			handleSubmit();
		}
	}, []);
	const handleSubmit = async (e) => {
		let repoList = await APIHandler.getUserRepoList(user);
		APIHandler.auditUserQuery({
			userId: user,
			timeStamp: new Date().toISOString(),
			response: repoList.map((repo) => {
				return { repoName: repo.name, repoUrl: repo.html_url, repoDescription: repo.description };
			})
		});
		setUserRepoList(repoList);
	};
	const handleUsernameChange = (e) => {
		let username = e.target.value;
		setUser(username);
	};
	return (
		<div className="UserContainer">
			<div className='userRepoContainer'>
				<div className='column is-centered' style={{ width: "75%", height: "50%" }}>
					<div className='box' style={{ minWidth: "60%", maxWidth: "100%" }}>
						<h1 className='title is-4 is-centered'>Search for user repo's</h1>
						<form ref={userSearchFormRef} className='field has-addons' onSubmit={handleSubmit}>
							<input
								ref={userSearchInputRef}
								className='input is-primary'
								type='text'
								name='username'
								onChange={handleUsernameChange}
								placeholder='GitHub Username'
							/>
							<button type='submit' className='button mx-2 is-info'>
								Search
							</button>
						</form>
					</div>
				</div>
				<ul className='list-group mx-auto p-3' style={{ width: "75%", height: "50%", overflowY: "auto" }}>
					{userRepoList.map((repo) => (
						<li className='list-group-item' key={repo.id}>
							<div className='box my-4 ps-3'>
								<strong>Repo: </strong>
								<a href={`/repo?repourl=${user}/${repo.name}`}>{repo.name}</a>
								<p>
									<strong>Description: </strong>
									{repo.description}
								</p>
								<p>
									<strong>URL: </strong> <a href={repo.html_url}>{repo.html_url}</a>
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default User;
