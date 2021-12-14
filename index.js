const express  = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// const expressLayouts = require('express-ejs-layouts');
const db  = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 

//to use the routes file
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`server end error: ${err}`);

    }
    console.log(`sucessful at ${port}`);
})
