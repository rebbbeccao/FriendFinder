var friendsData = require("../data/friends.js");
var path = require("path");
var bodyParser = require("body-parser");

module.exports = function(app) {
  // This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // if (!req.body) return res.sendStatus(400)

    // This will be used to handle incoming survey results.
    // This route will also be used to handle the compatibility logic.

    //user scores
    var newFriend = req.body;
    var scores = newFriend.scores;

    console.log("newFriend = " + newFriend);
    console.log("scores = " + scores);


    //user match
    var matchName = "";
    var matchPhoto = "";

    var totalDifference = 10000;

    // loop through friendsData array
    for (var i = 0; i < friendsData.length; i++) {
      var diff = 0;
      // loop through respective scores of user and friends
      for (var j = 0; j < scores.length; j++) {
        diff += Math.abs(parseInt(friendsData[i].scores[j]) - scores[j]);
        };   

        if (diff < totalDifference) {
          totalDifference = diff;
          matchName = friendsData[i].name;
          matchPhoto = friendsData[i].photo;
        }
      }
    
      friendsData.push(newFriend);
      res.json({ status: "OK", matchName: matchName, matchPhoto: matchPhoto });
  });
};
