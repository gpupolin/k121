const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/friendsecret");
  mongoose.set("debug", true);
}

const FriendSchema = new mongoose.Schema({
  name: String,
  email: String,
  friend: { type: mongoose.Schema.Types.ObjectId, ref: "Friend" }
});

const Friend = mongoose.model("Friend", FriendSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api/friends", (req, res) => {
  Friend.find((err, friends) => {
    res.json(friends);
  });
});

app.post("/api/friends", (req, res) => {
  const friend = new Friend({
    name: req.body.name,
    email: req.body.email
  });

  friend.save().then(friend => {
    res.json(friend);
  });
});

app.put("/api/friends/:id", (req, res) => {
  Friend.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email
      }
    },
    friend => {
      res.json(friend);
    }
  );
});

app.delete("/api/friends/:id", (req, res) => {
  Friend.deleteOne({ _id: req.params.id }, err => {
    res.json({ _id: req.params.id });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port);
