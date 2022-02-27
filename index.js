const express  = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// const expressLayouts = require('express-ejs-layouts');
const db  = require("./config/mongoose")
console.log(db._connectionString);
//session cookie creation
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const passportJWT = require("./config/passport-jwt");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const customMW = require("./config/customMW");
const googleAuth = require("./config/google-oauth20");
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname +"/uploads"));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'Hemanthify',
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) 
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
app.listen(port,function(err){
    if(err){
        console.log(`server end error: ${err}`);

    }
    console.log(`sucessful at ${port}`);
    
})
