const express = require("express");
const fs = require("fs");

const userRouter = require('./routes/user')
const app = express();
const PORT = 8000;
const {connectMongoDb} = require("./connection");

const {logReqRes} = require('./middlewares')


// Connection 


connectMongoDb('mongodb://localhost:27017/youtube-app-1').then(() => 
    console.log(`MongoDb Connected !`)
);


app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

app.use('/api/users',userRouter);
app.listen(PORT, () => console.log(`Server Started At ${PORT} ..!`));
