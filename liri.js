require("dotenv").config();

let axios = require("axios");

let request = require('request');

const keys = require("./keys.js");

const moment = require("moment");

const fs = require('fs');


/* const Spotify = require('node-spotify-api');
const spotify = new Spotify("keys.spotify"); */

let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

// APP LOGIC
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis();
            break;
        default:
            console.log("Please try again.")
    }
}
userCommand(userInput, userQuery);

// CONCERT THIS
function concertThis(userQuery) {

    var queryUrl = 'https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=codingbootcamp';
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
// spotify this
/*function spotifyThis () {
    console.log(`\n - - - - -\n\nSEARCHING FOR..."${userQuery}"`);

    // IF NO USER QUERY PASS VALUE OF "THW SIGN - ACE OF BASE" 
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

    // SPOTIFY SEARCH QUERY FORMAT
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // COLLECT SELECTED DATA IN AN ARRAY
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nBA DA BOP!  That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };
    });
}*/ 

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var dataFormat = response.data;
            if (dataFormat.Title === undefined) {
                axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
                    function (response) {
                        dataFormat = response.data;
                        console.log("\n----------------------")
                        console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
                    });
            } else {
                console.log("\n----------------------")
                console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
                //append to log.txt
                fs.appendFile("log.txt", "\nMovie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors + "; ", function (err) {
                    if (err) console.log(err)
                });
            };;
        }
    );
};

function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}
