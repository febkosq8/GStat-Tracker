// Get the GitHub username input form
const usernameForm = document.getElementById('usernameForm');
const repoUrlForm = document.getElementById('repoUrlForm');
var contiName=[];
var contiNum=[];
var totConti=0;
const xhr2 = new XMLHttpRequest();

// Listen for submissions on GitHub username input form
usernameForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let usernameForm = usernameInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(usernameForm);

})

// Listen for submissions on GitHub Repo URL input form
repoUrlForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let repoInput = document.getElementById('repoInput');

    // Get the value of the GitHub username input field
    let repoUrlForm = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestReposDetails(repoUrlForm);

})

function requestContributors(repoUrl)
{
    
    const url2 = `https://api.github.com/repos/${repoUrl}/contributors`;
    xhr2.open('GET', url2, true);
    
    xhr2.onload = function() {
        
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        //console.log("Inside requestContributors");
        //console.log(data);
        for (let i in data)
        {
            //console.log("Inside Inside requestContributors");
            //console.log(data[i]);
            contiName[i]=data[i].login;
            contiNum[i]=data[i].contributions;
            totConti = totConti + contiNum[i];
            //console.log("Console Output :"+contiName[i],contiNum[i]+" i:"+i );

        }   
        //console.log("State:"+xhr2.status);   
    }
    
    //console.log("Console Output 2:"+contiName[0],contiNum[0]);
  
    // Send the request to the server
    xhr2.send();
}

function requestUserRepos(username) {

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    //https://api.github.com/users/febkosq8/repos
    const url = `https://api.github.com/users/${username}/repos`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // When request is received
    // Process it here
    xhr.onload = function() {

        // Parse API data into JSON
        const data = JSON.parse(this.response);
        console.log("Inside requestUserRepos");
        console.log(data);
        let root = document.getElementById('userRepos');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');

            // Create variable that will create li's to be added to ul
            let li = document.createElement('li');

            // Add Bootstrap list item class to each li
            li.classList.add('list-group-item')
                // Create the html markup for each li
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
            // Append each li to the ul
            ul.appendChild(li);
        } else {

            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>Number of Public Repos : ${data.length}</p>`)
            ul.appendChild(p);
            // Loop over each object in data array
            for (let i in data) {
                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')

                // Create the html markup for each li
                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                // Append each li to the ul
                ul.appendChild(li);

            }

        }
    }

    // Send the request to the server
    xhr.send();

}

function requestReposDetails(repoUrl) {

    // Create new XMLHttpRequest object
    const xhr1 = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    //https://api.github.com/repos/febkosq8/CryptoGIF
    const url1 = `https://api.github.com/repos/${repoUrl}`;
    
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr1.open('GET', url1, true);
    

    // When request is received
    // Process it here
    xhr1.onload = function() {
        
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        console.log("Inside requestReposDetails");
        console.log(data);
            // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');
                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');
                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')
                // Create the html markup for each li
                //https://api.github.com/repos/febkosq8/Gstat-tracker/contributors
                requestContributors(repoUrl);
                setTimeout(() => {
                    //console.log("Repo Console Output :"+contiName[0],contiNum[0]);
                    //console.log(contiNum.length);
                    var tConti="<br />";
                    for(let i in contiNum)
                    {

                        tConti=tConti + "User : " + contiName[i] + " issued a total of " + contiNum[i] + " Commits."+ "<br />";
                    }
                    console.log("tConti : "+tConti);
                    var conti;
                    li.innerHTML = (`
                    <p><strong>Repo Name :</strong> ${data.name}</p>
                    <p><strong>URL :</strong> <a href="${data.html_url}">${data.html_url}</a></p>
                    <p><strong>Created by :</strong> ${data.owner.login}</p>
                    <p><strong>Created At :</strong> ${data.created_at}</p>
                    <p><strong>Last Commit On :</strong> ${data.pushed_at}</p>  
                    <p><strong>Contributors :</strong> ${tConti}</p>
                    <p><strong>Total Commits :</strong> ${totConti}</p>
                    
                                   
                    `)}
                , 500);
                
                
            ;

                // Append each li to the ul
                ul.appendChild(li);
                
    }

    // Send the request to the server
    xhr1.send();    
}