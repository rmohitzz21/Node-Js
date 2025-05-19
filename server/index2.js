// Import the 'http' module to create an HTTP server
const http = require('http');

const express = require('express');

const app = express();

// Using Express 

app.get("/", (req,res) => {
    return res.send("Hello From Home Page");
})

app.get("/about", (req,res) =>{
    return res.send("I AM Rana Mohit"+ req.query.name + 'Age : '+ req.query.age)
})



app.listen(8000, ()=> console.log(`Server is Running !`));

// const myServer = http.createServer(app);


// myServer.listen(8000, () => console.log("Server Started !"));