import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../handlers/APIHandler";
function Repo() {
	const [repoUrl, setRepoUrl] = React.useState(new URLSearchParams(document.location.search).get("repourl"));
	const [repoMetadata, setRepoMetadata] = React.useState({});
	const repoForm = React.useRef(null);
	const repoInputRef = React.useRef(null);
	useEffect(() => {
		if (repoUrl) {
			repoInputRef.current.value = repoUrl;
			handleSubmit();
		}
	}, []);
	const handleSubmit = async (e) => {
		if (repoUrl !== "") {
			let repoMetadata = await APIHandler.getRepoMetadata(repoUrl);
			let repoContributors = await APIHandler.getRepoContributors(repoUrl);
			repoMetadata = {
				...repoMetadata,
				totalContributions: repoContributors.reduce((acc, curr) => acc + curr.contributions, 0),
				contributors: repoContributors
			};
			setRepoMetadata(repoMetadata);
		}
	};
	const handleRepoUrlChange = (e) => {
		let repoUrl = e.target.value;
		setRepoUrl(repoUrl);
	};
	return (
		<>
			<div className='columns mt-4'>
				<div className='column is-one-third'></div>
				<div className='column'>
					<div className='box'>
						<h1 className='title is-4'>Search for repo detail's</h1>
						<form
							ref={repoForm}
							className='field has-addons'
							style={{ width: "500px" }}
							onSubmit={handleSubmit}>
							<a className='button is-static'>github.com/</a>
							<input
								className='input is-primary'
								ref={repoInputRef}
								type='text'
								name='repourl'
								value={repoUrl}
								onChange={handleRepoUrlChange}
								placeholder='GitHub Repo Directory'
							/>
							<button type='submit' className='button mx-2 is-info'>
								Search
							</button>
						</form>
					</div>
				</div>
				<div className='column'></div>
			</div>
			<ul className='list-group mx-auto mb-5' style={{ width: "500px" }}>
				{repoMetadata.html_url ? (
					<li className='list-group-item'>
						<div class='box'>
							<p>
								<strong>Repo Name :</strong> {repoMetadata.name}
							</p>
							<p>
								<strong>URL :</strong> <a href={repoMetadata.html_url}>{repoMetadata.html_url}</a>
							</p>
							<p>
								<strong>Created by :</strong>{" "}
								<a href={`/user?username=${repoMetadata.owner.login}`}>{repoMetadata.owner.login}</a>
							</p>
							<p>
								<strong>Created At : </strong>
								{new Date(repoMetadata.created_at).toLocaleString()}
							</p>
							<p>
								<strong>Last Commit On :</strong> {new Date(repoMetadata.pushed_at).toLocaleString()}
							</p>
							<p>
								<strong>Contributors :</strong>
								<table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
									<thead>
										<tr>
											<td>
												<strong>Name</strong>
											</td>
											<td>
												<strong>Commits</strong>
											</td>
										</tr>
									</thead>
									<tbody>
										{repoMetadata.contributors.map((contributor) => {
											return (
												<tr>
													<td>
														<a href={`/user?username=${contributor.login}`}>
															{contributor.login}
														</a>
													</td>
													<td>{contributor.contributions}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</p>
							<p>
								<strong>Total Commits :</strong> {repoMetadata.totalContributions}
							</p>
						</div>
					</li>
				) : (
					<></>
				)}
			</ul>
		</>
	);
}

export default Repo;
