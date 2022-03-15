
module.exports.chatSockets = function(socketServer){
    const Server = require('socket.io');
    //It will be handling the connections
    let io = Server(socketServer, {
        // Fixing the cors issue
        cors: {
            origin: "http://localhost:8000"
        }
    });
    io.sockets.on('connection', function(socket){
        console.log('new connection',socket.id);
        socket.on('diconnect',function(){
            console.log('disconnected');
        });
        socket.on('join_room',function(data){
            console.log('req rec',data);
            socket.join(data.chatRoom);
            io.in(data.chatRoom).emit('user_joined',data);
        });
        socket.on('send_message',function(data){
            console.log(data);
            io.in(data.chatRoom).emit('recieve_message',data);
        });

    });


}