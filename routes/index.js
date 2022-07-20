const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = mongoose.model('Movie')

router.get('/', (req,res)=>{
    Movie.find().lean().exec(   (err,done)=>{
        if (!err){
            res.render('./movies/index',{movies:done});
        }else{
            res.send("Unable to load the data")
        }
    })
})
router.get('/addmovie', (req,res)=>{
    res.render('./movies/addmovie');
})
router.post('/addmovie', (req,res)=>{
    var movie = new Movie()
    movie.moviename = req.body.name,
    movie.rating = req.body.rating,
    movie.cast = req.body.cast,
    movie.genre = req.body.genre,
    movie.releasedate = req.body.date
    movie.save((err,done)=>{
        if (!err){
            res.redirect('/')
        }else{
            console.log('error',err);
        }
    })
})
router.get('/updatemovie/:id', (req,res)=>{
    console.log(req.params.id);
    Movie.findById(req.params.id).lean().exec((err,done)=>{
        if (!err){
            res.render('./movies/updatemovie',{movie:done});
            console.log(done)
        }else{
            res.send("Unable to load the data")
        }
    })
})
router.post('/updatemovie/:id',(req,res)=>{
    Movie.findOneAndUpdate({ _id: req.params.id },{
        moviename:req.body.name,
        rating:req.body.rating,
        cast:req.body.cast,
        genre:req.body.genre,
        releasedate:req.body.date
        },{new: true },(err,done)=>{
        if (!err){
            res.redirect('/')
        }else{
            res.send("Unable to load the data")
        }
})
})
router.get('/delete/:id',(req,res)=>{
    Movie.findOneAndDelete({ _id: req.params.id },(err,done)=>{
        if (!err){
            res.redirect('/');
        }else{
            res.send("Unable to delete");
        }
})
})

module.exports = router;