# simple-login-authentificator

A simple login authentificator that uses a MySQL-Database to store and retrieve Login-Data. It's a session-based authentification system
that uses Express-Session to setup the sessions. The Express-Session is stored on memory, so it doesn't persist. This will serve as a prototype
for the implementation of a login-authentification for other applications. 

Layout of the "users"-table on the MySQL-Database:


>       id (int) | username (varchar(50)) | password (varchar(255)) | email (varchar(100)) |
       
       
Preview of the UI on https://diasdecastro.github.io/simple-login-authentificator/  
>Login with:  
> >     username: dummy  
> >     password: dummy
