const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    MovieName: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    Cast: {
        type: Array
    },
    Genre: {
        type: String
    },
    ReleaseDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Movie',  movieSchema);