var friendsData = require("../data/friends");
module.exports = function(app){
    app.get("/friends",function(req,res){
        res.json(friendsData)
    });
    app.post("/api/friends",function(req,res){
        var userInput = req.body;
        var bestFriends = {
            name:"",
            photo:"",
            total:1000
        }
        friendsData.forEach(function(friend)  {
            var friendScores = friend.scores;
            var userScores = userInput.scores;
            var total1 = 0; 
           for(let i = 0; i < friendScores.length; i++){
           var difference = Math.abs(parseInt(userScores[i])-parseInt(friendScores[i]));
           total1+= difference; 
           }
           console.log(total1)
           if(total1<bestFriends.total){
            bestFriends.name=friend.name;
            bestFriends.photo=friend.photo;
            bestFriends.total=total1;
           }
        });
        friendsData.push(userInput);
        res.json(bestFriends);
    });
}