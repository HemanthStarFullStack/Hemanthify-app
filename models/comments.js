 
const mongoose = require("mongoose");

const commentSection = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


},{
    timestamps:true,
});

const Comment = mongoose.model('Comment',commentSection);
module.exports = Comment