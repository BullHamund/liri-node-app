require("dotenv").config();
var axios = require("axios");


var keys = require("./keys.js");

var request = require('request');

/*var Spotify = require('node-spotify-api');
var spotify = new Spotify("keys.spotify"); */

var moment = require("moment");

var fs = require('fs');

var commands = ["concert-this",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says"
];
var userInput = process.argv[2];
var userQuery = process.argv.slice(3);
userQuery = userQuery.join(" ");



function concertThis(userQuery) {
    var queryNormalize = userQuery.split(" ").join("%20");
    var queryUrl = 'https://rest.bandsintown.com/artists/' + queryNormalize + '/events?app_id=codingbootcamp';
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length === 0) {
                console.log("\nNo Shows for this Artist")
            } else {
                for (var i = 0; i < 5; i++) {
                    var venueName = response.data[i].venue.name;
                    var venueCity = response.data[i].venue.city;
                    var venueState = response.data[i].venue.region;
                    var venueCountry = response.data[i].venue.country;
                    var showDate = moment(response.data[i].datetime).format("MM-DD-YYYY");
                    console.log("Name of Venue: " + venueName + "\nLocation of Show: " + venueCity + ", " + venueState + ", " + venueCountry + "\nDate of Show: " + showDate);
                    console.log("\n----------------------")
                    fs.appendFile("random.txt", "\nName of Venue: " + venueName + "\nLocation of Show: " + venueCity + ", " + venueState + ", " + venueCountry + "\nDate of Show: " + showDate + "; ", function (err) {
                        if (err) console.log(err)
                    });
                };
            };
        });
};

//Bands In Town
if (userInput === commands[0]) {
    concertThis(userQuery);
};