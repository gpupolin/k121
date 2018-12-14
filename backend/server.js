const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api/friends", (req, res) => {
  res.json([
    {
      id: 1,
      name: "João",
      email: "joao@gmail.com",
      friend_id: null,
      friend: null
    },
    {
      id: 2,
      name: "Melissa",
      email: "melissa@gmail.com",
      friend_id: null,
      friend: null
    },
    {
      id: 3,
      name: "Guilherme",
      email: "gpupolin@gmail.com",
      friend_id: null,
      friend: null
    }
  ]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port);
