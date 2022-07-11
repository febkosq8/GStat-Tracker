// Get the GitHub username input form
const usernameForm = document.getElementById("usernameForm");
const repoUrlForm = document.getElementById("repoUrlForm");
let contiName = [];
let contiNum = [];
let totConti = 0;

async function dataFetch(url, method) {
	return await fetch(url, {
		method: method
	}).then((response) => response.json());
}

usernameForm.addEventListener("submit", (e) => {
	// Prevent default form submission action
	e.preventDefault();

	// Get the GitHub username input field on the DOM
	let usernameInput = document.getElementById("usernameInput");

	// Get the value of the GitHub username input field
	let usernameForm = usernameInput.value;

	// Run GitHub API function, passing in the GitHub username
	requestdisplayList(usernameForm);
});

// Listen for submissions on GitHub Repo URL input form
repoUrlForm.addEventListener("submit", (e) => {
	// Prevent default form submission action
	e.preventDefault();

	// Get the GitHub username input field on the DOM
	let repoInput = document.getElementById("repoInput");

	// Get the value of the GitHub username input field
	let repoUrlForm = repoInput.value;

	// Run GitHub API function, passing in the GitHub username
	requestReposDetails(repoUrlForm);
});

async function requestContributors(repoUrl) {
	let url = `https://api.github.com/repos/${repoUrl}/contributors`;
	return await dataFetch(url, "GET");
}

async function requestdisplayList(username) {
	let url = `https://api.github.com/users/${username}/repos`;
	let data = await dataFetch(url, "GET");
	let children = [];
	if (data.message === "Not Found") {
		let ul = document.getElementById("displayList");
		// Create variable that will create li's to be added to ul
		let li = document.createElement("li");
		// Add Bootstrap list item class to each li
		li.classList.add("list-group-item");
		// Create the html markup for each li
		li.innerHTML = `
                <p><strong>No account exists with username:</strong> ${username}</p>`;
		// Append each li to the ul
		children.push(li);
		ul.replaceChildren(...children);
	} else {
		// Get the ul with id of of displayList
		let ul = document.getElementById("displayList");
		let p = document.createElement("p");
		p.innerHTML = `<p><strong>Number of Public Repos : ${data.length}</p>`;
		ul.appendChild(p);
		// Loop over each object in data array
		for (let i in data) {
			// Create variable that will create li's to be added to ul
			let li = document.createElement("li");

			// Add Bootstrap list item class to each li
			li.classList.add("list-group-item");

			// Create the html markup for each li
			li.innerHTML = `
                <div class="box my-4 px-1">
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                </div>
            `;

			// Append each li to the ul
			children.push(li);
		}
		ul.replaceChildren(...children);
	}
}

async function requestReposDetails(repoUrl) {
	let url = `https://api.github.com/repos/${repoUrl}`;
	// Get the ul with id of of displayList
	let ul = document.getElementById("displayList");
	// Create variable that will create li's to be added to ul
	let li = document.createElement("li");
	// Add Bootstrap list item class to each li
	li.classList.add("list-group-item");
	// Create the html markup for each li
	//https://api.github.com/repos/febkosq8/Gstat-tracker/contributors
	let data = await dataFetch(url, "GET");
	let contributorList = await requestContributors(repoUrl);
	let totalContributions = contributorList.reduce((acc, curr) => acc + curr.contributions, 0);
	let contributorTable = `<table class="table">
        <thead>
            <tr>
                <td><strong>Name</strong></td>
                <td><strong>Commits</strong></td>
            </tr>
        </thead>
        <tbody>
        ${contributorList
			.map((contributor) => {
				return `<tr>
                <td>${contributor.login}</td>
                <td>${contributor.contributions}</td>
            </tr>`;
			})
			.join("")}
        </tbody>
    </table>`;
	li.innerHTML = `
                    <div class="box">
                        <p><strong>Repo Name :</strong> ${data.name}</p>
                        <p><strong>URL :</strong> <a href="${data.html_url}">${data.html_url}</a></p>
                        <p><strong>Created by :</strong> ${data.owner.login}</p>
                        <p><strong>Created At :</strong> ${new Date(data.created_at).toLocaleString()}</p>
                        <p><strong>Last Commit On :</strong> ${new Date(data.pushed_at).toLocaleString()}</p>  
                        <p><strong>Contributors :</strong> ${contributorTable}</p>
                        <p><strong>Total Commits :</strong> ${totalContributions}</p>
                    </div>
                    `;
	ul.replaceChildren(li);
}