// Model Schema For User Favourite Movie

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    
    userFrom: {type: Schema.Types.ObjectId,ref: 'User'},
    movieId: {type: String},
    movieTitle: {type: String},
    movieImage: {type: String}
},{timestamps: true})  //to get current date



// Database Collection of "UserFavoriteMovie"
const Favorite = mongoose.model('UserFavoriteMovie', favoriteSchema);
module.exports = { Favorite }