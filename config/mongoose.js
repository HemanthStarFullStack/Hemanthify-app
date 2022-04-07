const mongoose = require('mongoose');
const env = require('../config/enivironment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db  = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){

    console.log('connected to ::DB');

});

module.exports = db;

 