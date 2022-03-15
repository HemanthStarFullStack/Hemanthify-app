class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');
        if(this,userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('Connection Established');
            self.socket.emit('join_room',{
                user_email:this.userEmail,
                chatRoom : 'Hemanth'
            });
            self.socket.on("user_joined",function(data){
                console.log('a user joined',data);
            });
        });
        $('#send-message').click(function(){
            let message = $('#type-message').val();
            console.log(message);
            
                self.socket.emit('send_message',{
                    message:message,
                    user_email:self.userEmail,
                    chatRoom:'Hemanth'
                });
        });
        self.socket.on('recieve_message',function(data){
            console.log('message recieved',data.message);
            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>',{
                html: data.message
            }));
            newMessage.append($('<sub>',{
                html:data.user_email
            }));
            newMessage.addClass(messageType);
            $('.chat-box').append(newMessage);
        });
    }
}