var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
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
  // console.log('parsed data:', parsedData);
  parsedData.forEach(function(object){
    console.log(object.avatar_url);
    downloadImageByURL(object.avatar_url, 'avatars/' + object.login + '.jpg');
  });
});

function downloadImageByURL(url, filePath) {
  request
  .get(url)
  .on('error', function(err){
    console.log('error', error);
  })
  .pipe(fs.createWriteStream(filePath));
  console.log("url: ", url);
  console.log("file path:", filePath);
}