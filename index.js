const express  = require("express");
const app = express();
const port = 8000;


//to use the routes file
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`server end error: ${err}`);

    }
    console.log(`sucessful at ${port}`);
})