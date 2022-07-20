const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = mongoose.model('Movie')

router.get('/', (req,res)=>{
    let user = req.session.user;
    Movie.find().lean().exec((err,done)=>{
        if (!err){
            res.render('./movies/index',{movies:done, user:user});
        }else{
            res.send("Unable to load the data")
        }
    })
})
router.get('/addmovie', (req,res)=>{
    if (req.session.user){
        res.render('./movies/addmovie');
    }else{
        res.redirect('/user/login')
    }
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
    if (req.session.user){
        Movie.findById(req.params.id).lean().exec((err,done)=>{
            if (!err){
                res.render('./movies/updatemovie',{movie:done});
                console.log(done)
            }else{
                res.send("Unable to load the data")
            }
        })
    }else{
        res.redirect('/user/login')
    }
})
router.post('/updatemovie/:id',(req,res)=>{
    if (req.session.user){
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
    }else{
        res.redirect('/user/login')
    }
})
router.get('/delete/:id',(req,res)=>{
    if (req.session.user){
        Movie.findOneAndDelete({ _id: req.params.id },(err,done)=>{
            if (!err){
                res.redirect('/');
            }else{
                res.send("Unable to delete");
            }
        })
    }else{
        res.redirect('/user/login')
    }
})

module.exports = router;