import React from "react";

function Home() {
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
				<button class="button is-link">User Query</button>
			</div>
			<div className='column'></div>
				
			
		</div>

		</div>;
}

export default Home;
