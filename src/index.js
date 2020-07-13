function makePostRequest(){
    let httpRequest = new XMLHttpRequest();
    
    httpRequest.open("POST", "http://localhost:3000/users", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify({
        "username": "Button",
        "password": "Button",
        "email": "Button@button"
    }));

    httpRequest.onreadystatechange = function() {    
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // Everything is good, the response was received.
            alert("first phase!");
            console.log(httpRequest.readyState);
            if (httpRequest.status === 200) {
            // Perfect!
                document.getElementById("response").innerHTML = httpRequest.responseText;
            }
        } else {
            console.log(httpRequest.readyState);
            alert("Something wrong!");
        }
    }
}