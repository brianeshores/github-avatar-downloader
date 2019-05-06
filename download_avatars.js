var request = require('request');
var token = require('./secrets.js');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  var parsedData = JSON.parse(result);
  console.log('parsed data:', parsedData);
  parsedData.forEach(function(object){
    console.log(object.avatar_url);
  })
});
