console.log('this is loaded');

var dotenv=require("dotenv").config();

exports.bandsInTown= id.process.env.BANDSINTOWN_ID;

exports.spotify= {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};