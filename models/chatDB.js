const mongoose = require("mongoose");

const chatDBSchema  = new mongoose.Schema({
    chatRoom :{
        type:String,
        required:true
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatMessage'
    }]
},{
    timestamps:true
});

const chatDB = mongoose.model('chatDB', chatDBSchema);
module.exports = chatDB;

