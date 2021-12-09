const express  = require("express");
const app = express();
const port = 8000;



//to use the routes file
app.use('/',require('./routes/index'));

app.set('view_engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`server end error: ${err}`);

    }
    console.log(`sucessful at ${port}`);
})
