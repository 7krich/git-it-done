// PULL SERVER DATA
function getUserRepos(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch request to url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    // display error message (404)
    } else {
        alert("Error: GitHub User not found");
    }
    })
    // built in fetch error for server, internet range & connectivity issues (500's)
    .catch(function(error) {
        // .catch is getting chained to end of the then method
        alert("Unable to connect to Github");
    });
};

// DEFINE VARIABLES
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// FORM FUNCTION EVENT
function formSubmitHandler(event) {
    event.preventDefault();
    console.log(event);

    //get value from <input> element via nameInputEl DOM variable defined above
    var username = nameInputEl.value.trim();

    //check that there's a value in the username variable, if so run user repo function & clear out the form
    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

// EVENT LISTENER TO RUN EVENT
userFormEl.addEventListener("submit", formSubmitHandler);

// DISPLAY REPO'S IN BROWSER
function displayRepos (repos, searchTerm) {
    // check if api returned any repos -- error
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name, repo[i] being each individual repo pulled in the loop
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        // if > 0 list # of issues and red x
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        // if repo count is not > 0 return check
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};
