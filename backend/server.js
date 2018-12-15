const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const async = require("async");

const api_key = process.env.MAIL_API_KEY;
const DOMAIN = "samples.mailgun.org";
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: DOMAIN });

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
  Friend.find()
    .populate("friend")
    .exec((err, friends) => {
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

app.post("/api/friends/draw", (req, res) => {
  Friend.find((err, friends) => {
    const friendsAfterDraw = draw(JSON.stringify(friends));
    async.eachSeries(
      friendsAfterDraw,
      (friend, done) => {
        Friend.updateOne(
          { _id: friend._id },
          { $set: { friend: { ...friend.friend } } }
        ).exec(done);
      },
      err => {
        Friend.find()
          .populate("friend")
          .exec((err, friends) => {
            friends.map(friend => {
              const data = {
                from: "Amigo Secreto Teste <me@samples.mailgun.org>",
                to: person.email,
                subject: `Sorteio amigo secreto`,
                text: `${person.name} seu amigo secreto é ${person.friend.name}`
              };

              mailgun.messages().send(data, function(error, body) {
                console.log(error);
                console.log(body);
              });
            });

            res.json(friends);
          });
      }
    );
  });
});

const draw = array => {
  const friends = JSON.parse(array);
  return friends.reduce((acc, person, index) => {
    const possiblesFriends = friends
      .filter(a => a._id !== person._id)
      .filter(a => !acc.some(l => l.friend._id === a._id))
      .map(a => {
        return { name: a.name, _id: a._id, email: a.email };
      });

    if (
      possiblesFriends.length === 2 &&
      possiblesFriends.some(p => p._id === friends[index + 1]._id)
    ) {
      return acc.concat({
        ...person,
        ...{
          friend: possiblesFriends.filter(
            p => p._id === friends[index + 1]._id
          )[0]
        }
      });
    }

    return acc.concat({
      ...person,
      ...{
        friend:
          possiblesFriends[Math.floor(Math.random() * possiblesFriends.length)]
      }
    });
  }, []);
};

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port);
