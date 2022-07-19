const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();

if (process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config();
}

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection;
db.on('error',(error)=> console.log(error));
db.once('open', ()=>{console.log('database is connected')})

// Routing
const indexRouter = require('./routes/index');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname+'/views'}));
app.set('views',__dirname+'/views');
app.use(express.static('/public'));

app.use('/',indexRouter);

app.listen(process.env.PORT || 3000)