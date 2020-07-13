const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
var app = express();
const bodyparser = require('body-parser');

//SESSION
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000, //30 min
        // secure: false
    }
}));

// CORS on ExpressJS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // * allows any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myPassword12',
    database:'nodelogin',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("DB connection success");
    } else {
        console.log("DB connection failed \n Error: " + JSON.stringify(err, undefined, 2));
    }
});

app.listen(3000, () => console.log("Express server is runnung at port 3000"));


//############################## LOGIN ########################################

app.post('/login',  (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        let sqlSearchforMatchQuery = "SELECT * FROM accounts WHERE username = ? AND password = ?;";
        mysqlConnection.query(sqlSearchforMatchQuery, [username, password], (err, results, fields) => {
            if(err) {
                throw err;
            }
            if (results.length > 0) {                     
                var row = JSON.parse(JSON.stringify(results[0]));
                req.session.user = row;
                res.send(row);
            } else {
                res.send("false");
            }
        });
    }
});

//############################## SIGN IN ##########################################

app.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let confirm = req.body.confirm;
    let password = req.body.password;

    if (username && email && confirm && password) {
        if (username) {
            let checkIfUsername = "SELECT * FROM accounts WHERE username = ?;";
            mysqlConnection.query(checkIfUsername, [username], (err, results, fields) => {
                if (err) {
                    throw err;
                }
                if (results.length > 0) {
                    res.send("Username not available");
                    return;
                } else if (email != confirm) {
                    res.send("Different Emails");
                    return;
                } else {
                    let signupQuery = "INSERT INTO accounts (id, username, password, email) VALUES (0, ?, ?, ?);";
                    mysqlConnection.query(signupQuery, [username, password, email], (err, results, fields) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send("Sign Up Successful");
                        }
                    })
                }
            });
        }        
    }
});





