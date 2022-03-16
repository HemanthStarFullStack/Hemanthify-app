    class Custom_call{
        constructor(id){
            this.id = id;
            this.form = $(`#chat-${this.id}`);
            console.log(this.form);
            let self = this;
            this.form.submit(function(e){
                e.preventDefault()
                self.custom_ChatRoom();
            });
        }
        custom_ChatRoom = function(){
            let self = this;
            $.ajax({
                type:'post',
                url:"/chat/chatroom",
                data:self.form.serialize(),
                success: function(data){
                    console.log(data);
                    new ChatEngine(data.data.recId,data.data.sendId,data.data.recName);
                }
            });
         }
    }
    class ChatEngine{
        constructor(RecId,sendId,userName){
            this.recId = RecId;
            this.sendId = sendId;
            this.userName = userName;
            console.log("recieverId",this.recId)
            console.log("senderId",this.sendId)
            console.log("userName",this.userName);
            this.DOMhtml = this.newChaDOM();
            this.chatDOM  = $('#chat-DOM');
            $("#remove").remove();
            this.chatDOM.prepend(this.DOMhtml);
            this.socket = io.connect('http://localhost:5000');
            if(this.userName){
                this.connectionHandler();
            }
        }
        newChaDOM = function(){
            return $(`<div id ="chat-container" class="${this.userName}">
                            <ul class="chat-box">
                            </ul>
                            <div id="input-id">
                                <input type="text" name="Message" id="type-message" placeholder="type your message............">
                                <button id="send-message">Send</button>
                            </div>
                    </div>`)
                }
        connectionHandler(){
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
            let self = this;
            let arr = [self.recId,self.sendId];
            arr.sort();
            let chatName = arr[0]+"-"+arr[1]
            console.log(chatName);
            console.log(arr);
            this.socket.on('connect',function(){
                console.log('Connection Established');
                self.socket.emit('join_room',{
                    user_email:this.userName,
                    chatRoom : chatName
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
                        user_email:self.userName,
                        chatRoom: chatName
                    });
            });
            self.socket.on('recieve_message',function(data){
                console.log('message recieved',data.message);
                let newMessage = $('<li>');
                let messageType = 'other-message';
                if(data.user_email == self.userName){
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
