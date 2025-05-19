const express =  require('express');

const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;


// ROUTES

app.get('/users', (req,res) => {
    return res.json(users);
})


app.listen(PORT, () => console.log(`Server Started At ${PORT} ..!`));

