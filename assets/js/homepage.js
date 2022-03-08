// PULL SERVER DATA
function getUserRepos(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch request to url
    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

// DEFINE VARIABLES
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

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
