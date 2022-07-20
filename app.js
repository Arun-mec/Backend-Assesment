require('./models/mongodb');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routing
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname+'/views'}));
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret:'key',resave:false,
saveUninitialized:false, cookie:{maxAge:100000}}));
//Routing
app.use('/',indexRouter);
app.use('/user',userRouter);

app.listen(process.env.PORT || 3000)