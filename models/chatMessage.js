const mongoose = require("mongoose");

const chatMessageDB  = new mongoose.Schema({
    chatRoom :{
        type:mongoose.Schema.Types.ObjectId,
        ref :'chatDB'
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const chatMessage = mongoose.model('chatMessage',chatMessageDB);
module.exports = chatMessage;