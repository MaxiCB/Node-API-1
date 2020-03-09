const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 1337;

app.use(express.json());
app.use(cors());

let users = [];

app.get("/", (_req, res) => {
  res.send("🚀 Hello from 1337!");
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.id && user.name && user.bio) {
    users.push(user);
    res.send("Added User!").status(201);
  } else {
    res.send("Please provide a id/name/bio to create a user!").status(400);
  }
});

app.get("/api/users", (_req, res) => {
  if (users.length > 0) {
    res.send(users).status(200);
  } else {
    res.send("No Users in the database!").status(200);
  }
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter(user => user.id == id);
  if (user) {
    res.send(user);
  } else {
    res.send("No user with that id!").status(404);
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.filter(user => user.id == id);
  if (user) {
    users = users.filter(user => user.id !== id);
    res.send(`Deleted User ${id}!`).status(200);
  } else {
    res.send("No user with that id!").status(404);
  }
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userUpdate = req.body;
  const index = users.findIndex(user => user.id == id);
  if (index) {
    const oldUser = users[index];
    const newUser = {
      id: userUpdate.id || oldUser.id,
      name: userUpdate.name || oldUser.name,
      bio: userUpdate.bio || oldUser.bio
    };
    users[index] = newUser;
    res.send("Updated user!").status(200);
  } else {
    res.send("Cannot find that user in the database!").status(404);
  }
});

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on http://localhost:${port}`);
});
