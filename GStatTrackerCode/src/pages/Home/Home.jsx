import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const Nav=useNavigate();
	return <div>

		<div className='columns mt-4'>
			<div className='column is-one-third is-offset-1'>
				<article class="message is-info">
					<div class="message-header">
						<p>About GStat Tracker</p>
					</div>
					<div class="message-body">
						This app helps you to manage and view stats for various GitHub Users and their Repo's. 
					</div>
				</article>
			</div>
			<div className='column'>
				<article class="message is-info">
						<div class="message-header">
							<p> User Query</p>
						</div>
						<div class="message-body">
							This page helps you to view the details of a GitHub User.<br></br>
							<button class="button is-link" onClick={(e)=>{Nav("/user")}} >User Query</button>
							
						</div>
				</article>
				<article class="message is-info">
						<div class="message-header">
							<p> Repo Query</p>
						</div>
						<div class="message-body">
							This page helps you to view the details of a GitHub Repo.<br></br>
							<button class="button is-link" onClick={(e)=>{Nav("/repo")}}>Repo Query</button>
						</div>
				</article>
				<br></br>
				
			</div>
			<div className='column'></div>	

		</div>

		</div>;
}

export default Home;
