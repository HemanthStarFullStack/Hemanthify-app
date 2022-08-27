const express  = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helper')(app);
const port = 7000;
const path = require("path");

const logger = require('morgan');
// const expressLayouts = require('express-ejs-layouts');
const db  = require("./config/mongoose")
console.log(db._connectionString);

const env = require('./config/enivironment');
const kue = require('kue');
const CM = require("./workers/commentEmailWorker");
//session cookie creation
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const passportJWT = require("./config/passport-jwt");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

const http  = require('http');
const server = http.createServer(app);
const chatSockets = require('./config/chatSockets').chatSockets(server);
server.listen(8443);

console.log('server is listening on 5000');

const customMW = require("./config/customMW");
const googleAuth = require("./config/google-oauth20");
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use('/uploads',express.static(__dirname +"/uploads"));
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:env.sessionCookie,
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100000*60*100) 
    },
    store:MongoStore.create({
        mongoUrl:db._connectionString,
        autoRemove:'disabled'
    },
        function(err){
            console.log(err)
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use(flash());
app.use(customMW.FlashSetUp);
app.use('/',require('./routes'));
kue.app.listen(3001);
app.listen(port,function(err){
    if(err){
        console.log(`server end error: ${err}`);

    }
    console.log(`sucessful at ${port}`);
    
})
