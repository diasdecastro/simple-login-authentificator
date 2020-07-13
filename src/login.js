function renderLoginPage() {
    let root = document.getElementById("root");
    root.innerHTML = (
        '<div class="loginForm">' +
            '<div class="h1"><h1>Login</h1></div>' +        
            '<form method="POST" onsubmit="login(this.username.value, this.password.value); return false;">' +
                '<label for="username">Username: </label>' +
                '<input type="text" name="username" id="username" placeholder="Insert Username" autocomplete="off" required>' +
                '<label for="password">Password: </label>' +
                '<input type="password" name="password" id="password" placeholder="Insert Password" autocomplete="off" required>' +
                '<div class="forgotPassword"><a href="">Forgot password?</a></div>' +
                '<input class="submit" type="submit" value="Login">' +
            '</form>' + 
            '<div class="signupField">' +
                '<p class="signupTxt">Create an account</p>' +
                '<button class="signupButton" onclick="renderSignupPage(); return false;">Sign Up</button>' +
            '</div>' +         
        '</div>'
    );
}

function login(username, password) {

    if(username == "dummy" && password == "dummy"){
        console.log("dummy")
        renderHomepageLoggedIn("dummy", true);
        return;
    }

    let httpRequest = new XMLHttpRequest();

    

    httpRequest.open("POST", "http://localhost:3000/login", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify({
        "username": username,
        "password": password
    }));

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // Everything is good, the response was received.             
            if (httpRequest.status === 200) {
                // Perfect!
                if(httpRequest.response == "false") {
                    renderHomepageLoggedIn("", false);
                } else {
                    renderHomepageLoggedIn(httpRequest.response, true);
                }                    
            }
        }
    }
}

function renderHomepageLoggedIn(user, success) {
    let root = document.getElementById("root");    
    if(success && user != "dummy") {
        //response object "user" is not a json-obj but json-string. therefore need of deserialization function "JSON.parse()"
        let userObj = JSON.parse(user);
        root.innerHTML = `<h1>Welcome ${userObj.username}!</h1>`;
    } else if (user == "dummy"){
        root.innerHTML = `<h1>Welcome!</h1>`;
    } else if (!document.getElementById("wrongCredentials")) {
        let wrongCredentials = document.createElement("div");
        wrongCredentials.id = "wrongCredentials";
        wrongCredentials.innerHTML = "Username and/or Password wrong";
        root.appendChild(wrongCredentials);
    }    
}


