const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const { json } = require("stream/consumers");
const app = express();
const PORT = 8000;

// Middle Ware - pLugin

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
    </ul>`;

  res.send(html);
});

// ROUTES

// REST API

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {

    const id = parseInt(req.params.id);
    const updatedField = req.body;

    const index = users.findIndex(user => user.id === id);
    if(index === -1){
        return res.status(404).json({status : "User Not Found "});
    }

    users[index] = {...users[index], ...updatedField };

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data) =>{

        return res.json({status: 'updated', user:users[index]});
    })

})
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);

    const index = users.findIndex((user) => user.id == id);
    if (index != -1) {
      users.splice(index, 1);
      return res.json({ status: "Deleted", id: id });
    } else {
      return res.status(400).json({ status: "User Not Found " });
    }
  });

// app.get("/api/users/:id", (req,res) => {

// });

app.post("/api/users", (req, res) => {
  // ToDo Create New Users :
  const body = req.body;
  // console.log("Body : ",body);

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success ", id: users.length });
  });

  // return res.json({ status: "Penidng"});
});

//

app.listen(PORT, () => console.log(`Server Started At ${PORT} ..!`));
