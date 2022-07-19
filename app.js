const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

// Routing
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

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

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname+'/views'}));
app.set('views',__dirname+'/views');
app.use(express.static('/public'));

//Routing
app.use('/',indexRouter);
app.use('/user',userRouter);

app.listen(process.env.PORT || 3000)