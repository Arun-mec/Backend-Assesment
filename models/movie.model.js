const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    moviename: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    cast: {
        type: Array
    },
    genre: {
        type: String
    },
    releasedate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie',  movieSchema);