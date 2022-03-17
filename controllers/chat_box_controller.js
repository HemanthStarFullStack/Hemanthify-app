const user = require('../models/user');
const chatDB = require('../models/chatDB');
module.exports.chat = async function(req,res){
    console.log(req.params.sendId);
    let activeUser = await user.findById(req.params.sendId)
    .populate({
        path:'friends',
        populate:{
            path:'_id'
        }
    });
    return res.render('chat_box',{
        title:"Chat",
        friendData:activeUser.friends
    });
}
module.exports.customChatRoom  = async function(req,res){
    let messageData = await populateMessage(req.body.sendId,req.body.recId);
    console.log(req.body.recId,req.body.recName,req.body.sendId);
    console.log(req.xhr);
    if(req.xhr){
        return res.json({
            message:'reciever message',
            data:{
                sendId:req.body.sendId,
                recId: req.body.recId,
                recName:req.body.recName,
                messageData : messageData
            }
        })
    }
    return;

}
const populateMessage = async function(sendId,recId){
    let arr = [sendId,recId];
    arr.sort()
    let roomName = arr[0]+"-"+arr[1];
    let room  = await chatDB.findOne({chatRoom:roomName}).
    populate('messages');
    return room

}

 