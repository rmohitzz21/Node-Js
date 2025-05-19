// Import the 'http' module to create an HTTP server
const http = require('http');

// Import the 'fs' module to work with the file system
const fs = require('fs');
const url = require('url');

// Create an HTTP server
const myServer = http.createServer((req, res) => {

    if(req.url === "/favicon.ico") return res.end();

    // Log the current timestamp and requested URL
    const log = `${Date.now()} : ${req.method} ${req.url} New Req Recived : \n`;
    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);
    
    // Append the log to a file named 'log.txt'
    fs.appendFile("log.txt", log, (err, data) => {
        // Handle different routes based on the requested URL
        switch (myUrl.pathname) {
            // If the URL is '/', respond with "HOME PAGE"
            case '/': 
                res.end("HOME PAGE");
                break;

            // If the URL is '/about', respond with "I am Rana Mohit"
            case '/about': 
                // res.end("I am Rana Mohit");
                // const qp = res.end("I Am Mohit");
                const userName = myUrl.query.myname;
                res.end(`Hi, ${userName}`);
                break;

            case '/search':
                const search = myUrl.query.search_query;
                res.end(`Here are Result for : ${search}`);
                break;
            // For any other URL, respond with "404 Not Found ?"
            
            case '/signup':
                if(req.method === 'GET') res.end("This is a Sign Up Form ");
                //Query
                else if(req.method === 'POST'){
                    res.end("Suscess")
                }
                break;
            

            default: 
                res.end("404 Not Found ?");
        }
    });
});

// Start the server and listen on port 8000
myServer.listen(8000, () => console.log("Server Started !"));