const express = require('express');
const urlRoute  = require('./routes/url');
const app = express();
const PORT = 8001;
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url')


connectToMongoDB('mongodb://localhost:27017/Short-url')
.then( ()=>  console.log('MongoDB Connected !'))

app.use(express.json()); //middleware

app.use('/url', urlRoute);

app.get('/:shortId',async(req,res) =>{

    const shortId = req.params.shortId;
    const entery = await URL.findOneAndUpdate({
        shortId
    }, 
    {
        $push: {
        visitHistory: {
           timestamp:Date.now(),
        },
    },
},
);
    res.redirect(entery.redirectURL);
})



app.listen(PORT, () => console.log(`Server is Running On ${PORT}`));

