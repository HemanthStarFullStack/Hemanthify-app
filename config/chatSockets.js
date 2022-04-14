const chatDB = require("../models/chatDB");
const chatMessage = require('../models/chatMessage');
module.exports.chatSockets = function(socketServer){
    const Server = require('socket.io');
    //It will be handling the connections
    let io = Server(socketServer, {
        // Fixing the cors issue
        cors: {
            origin: "http://hemanthify.in"
        }
    });
    io.sockets.on('connection', function(socket){
        console.log('new connection',socket.id);
        socket.on('disconnect',function(){
            console.log('disconnected');
        });
        socket.on('join_room',function(data){
            console.log('req rec',data);
            socket.join(data.chatRoom);
            io.in(data.chatRoom).emit('user_joined',data);
        });
        socket.on('send_message',async function(data){
            console.log(typeof(data.message));
            console.log(data);
            storeMessage(data);
            io.in(data.chatRoom).emit('recieve_message',data);
        });

    });

}

const storeMessage = async function(data){
    try{
        let chatRoom = await chatDB.findOne({chatRoom:data.chatRoom});
        if(!chatRoom){
            chatRoom = await chatDB.create({
                chatRoom : data.chatRoom,
            });
        }
        let messageData  = await chatMessage.create({
            chatRoom : chatRoom._id,
            User : data.Id,
            message:data.message
        });
        await chatRoom.messages.push(messageData._id);
        chatRoom.save();
        
    }catch(err){
        console.log(err);
        return
    }
     
     

} 
