const { json } = require('stream/consumers');
const env =require('./enivironment');
const fs = require('fs');
const path = require('path');
module.exports = (app) =>{
    app.locals.assetPath = function(filePath){
        if(env.name == 'development'){
            return filePath
        }
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname ,'../public/rev-manifest.json')))[filePath];
    }
}