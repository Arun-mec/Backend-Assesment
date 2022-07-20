//Connecting to the dtabase
const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config();
}
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open', ()=>{console.log('database is connected')})

require('./movie.model');