const mongoose = require('mongoose');
const User = require('./user');
const forgotPassword = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});
const forgotPass  = mongoose.model('ForgotPass',forgotPassword);
module.exports = forgotPass;