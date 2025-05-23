const express = require('express');
const urlRoute  = require('./routes/url');
const app = express();
const PORT = 8001;
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url')
const path = require('path');
const staticRoute  = require('./routes/staticRouter');

connectToMongoDB('mongodb://localhost:27017/Short-url')
.then( ()=>  console.log('MongoDB Connected !'))


app.set("view engine", "ejs");
app.set('views',path.resolve('./views'))
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: false}));


app.use('/url', urlRoute);
app.use('/',staticRoute)

app.get('/url/:shortId',async(req,res) =>{

    const shortId = req.params.shortId;
    const entery = await URL.findOneAndUpdate(
        {shortId}, 
    {
        $push: {
        visitHistory: {
           timestamp:Date.now(),
        },
    },
}
);

if(!entery){
    return res.status(404).send('Short URL not found');
}
    res.redirect(entery.redirectURL);
});





app.listen(PORT, () => console.log(`Server is Running On ${PORT}`));

