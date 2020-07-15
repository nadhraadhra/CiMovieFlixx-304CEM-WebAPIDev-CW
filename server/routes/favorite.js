const express = require('express');
const router = express.Router();
const { Favorite } = require("../modelsSchema/Favorite");    //calling the favorite from module schema
const { auth } = require("../middleware/auth");

router.post("/favoriteNumber", auth, (req, res) => {
    //Find Favorite info inside favorite selction by movie id
    Favorite.find({"movieId" : req.body.movieId})
    .exec((err , favorite) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, favoriteNumber: favorite.length})
    })
});

router.post("/favorited", auth, (req, res) => {
    //Find Favorite info inside favorite collection by MovieId and UserFrom
    Favorite.find({"movieId" : req.body.movieId, "userFrom" : req.body.userFrom})
    .exec((err , favorite) => {
        if(err) return res.status(400).send(err)
        let result = false;
        if(favorite.length !== 0){
            result = true
        }
        res.status(200).json({success: true, favorited: result})
    })
});

router.post("/addToFavorite", auth, (req, res) => {

    //Save new movie info in UserFavoriteMovieCollection in MongoDB
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.json({success: false, err})
       // return res.status(200).json({success: true})
       //return status message if successfully added to favourite movie
       return res.status(201).json({
           message: ""
       })
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    //Delete selected movie by Id from the favourite movie page list & MongoDB
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err , doc) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, doc})
        //return res.status(201).json({
          //  message:"",doc
       // })  
        
    })
});

router.post("/getFavoriteMovies", auth, (req, res) => {
    Favorite.find({userFrom: req.body.userFrom})
    .exec((err , favorites) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, favorites})
    })
});


module.exports = router;