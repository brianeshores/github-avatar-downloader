var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var owner = process.argv[2];
var name = process.argv[3];
if (owner && name === undefined) {
  console.log("Repo owner or repo name not specified.  Please try again");
} else {
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

  getRepoContributors(owner, name, function(err, result) {
    console.log('owner: ', owner);
    console.log('name: ', name);
    console.log("Errors:", err);
    var parsedData = JSON.parse(result);
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
  };