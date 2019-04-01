const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');
const jwtstrategy = require('./jwt');
const facebookstrategy = require('./faceBook');
const routes = require('./routes/router');
const server = app.listen(3000);
const socketApi = require('./control/ChatControl');
const io = socketApi.io
const session = require('express-session')

passport.use(jwtstrategy);
passport.use(facebookstrategy);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(routes);
io.attach(server)
socketApi.createServer();


