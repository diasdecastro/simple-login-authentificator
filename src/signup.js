function renderSignupPage() {
    let root = document.getElementById("root");
    root.innerHTML = (
        '<div class="signupForm">' +
            '<div class="h1"><h1>Sign Up</h1></div>' +      
            '<form id="signupForm" method="POST" onsubmit="signup(this.username.value, this.email.value, this.confirm.value, this.password.value); return false;">' +
                '<label for="username">Username: </label>' +
                '<input type="text" name="username" id="username" placeholder="  Insert Username" autocomplete="off" required>' +
                '<label for="email">Email: </label>' +
                '<input type="text" name="email" id="email" placeholder="  Insert Email"  autocomplete="off" required>' +
                '<label for="confirm">Confirm Email: </label>' +
                '<input type="text" name="confirm" id="confirm" placeholder="  Confirm Email" autocomplete="off" required>' +  
                '<label for="password">Password: </label>' +
                '<input type="password" name="password" id="password" placeholder="  Insert Password" autocomplete="off" required>' +               
                '<input class="submit" type="submit" value="Sign Up">' +
            '</form>'  +
            '<div class="loginField">' +
                '<p class="loginTxt">Already have an account?</p>' +
                '<button class="loginButton" onclick="renderLoginPage(); return false;">Login</button>' +
            '</div>' +
        '</div>'
    );
}


function signup(username, email, confirm, password) {
    /* console.log("Signing up");
    return; */

    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "http://localhost:3000/signup", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify({
        "username": username,
        "email": email,
        "confirm": confirm,
        "password": password
            
    }));

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            // Everything is good, the response was received.  
            if (httpRequest.status === 200) {
                // Perfect!   //NOT TESTED YET!!!!!!    TEST IT!!!!!!!!!!           
                if(httpRequest.response == "Username not available" || httpRequest.response == "Different Emails") {
                    console.log("not success");
                } else {
                    console.log("success");
                    successfulSignup();
                }
            }
        }
    }
    return;

}

function successfulSignup() {
    let signupMessage = document.createElement("div");
    signupMessage.innerHTML = "Sign Up successful!";
    signupMessage.id = "signupMessage";
    document.getElementById("signupForm").appendChild(signupMessage);
    
}