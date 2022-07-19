const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('./movies/index');
})
router.get('/addmovie', (req,res)=>{
    res.render('./movies/addmovie');
})

module.exports = router;