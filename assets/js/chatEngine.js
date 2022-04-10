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
                    displayFun();
                    new ChatEngine(data.data.recId,data.data.sendId,data.data.recName,data.data.messageData,data.data.rec_data);
                }
            });
         }
    }
    class ChatEngine{
        constructor(RecId,sendId,userName,messageData,rec_data){
            this.recId = RecId;
            this.sendId = sendId;
            this.userName = userName;
            this.messageData= messageData;
            this.rec_data = rec_data
            console.log("recieverId",this.recId)
            console.log("senderId",this.sendId)
            console.log("userName",this.userName);
            this.DOMhtml = this.newChaDOM(this.messageData,this.rec_data);
            $('.delete-box').remove();
            this.chatDOM  = $('#chat-DOM');
            this.chatDOM.prepend(this.DOMhtml);
            $('#remove2').remove();
            scrollTo();
            removes();
            this.socket = io.connect('http://43.204.29.107:5000');
            if(this.userName){
                this.connectionHandler();
            }
        }
        newChaDOM = function(messageData,rec_data){
            let self  = this;
            return $(` <div id ="chat-container" class="delete-box">
                                <div class="user-details">
                                    <div id="image">
                                        <img src="${rec_data.avatar}" alt="">
                                        <span>
                                            ${rec_data.name}
                                        </span>
                                    </div>
                                    <div class="remove">
                                        <button id="remove">
                                            <i class="fa-solid fa-circle-arrow-left"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="ul-class">
                                    <ul class="chat-box">
                                    ${messageData == null ? '': messageData.messages.map(function(message){
                                        if(message.User == self.sendId){
                                        return `<li class="self-message">${message.message}</li>`
                                        }
                                        else{
                                            return `<li class="other-message">${message.message}</li>`
                                        }
                                    }).join('')}
                                    </ul>
                                </div>
                                <div id="input-id">
                                    <input type="text" name="Message" id="type-message" placeholder="type your message............">
                                    <button id="send-message">
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </button>
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
                if(message !== ''){
                    self.socket.emit('send_message',{
                            message:message,
                            user_Name:self.userName,
                            chatRoom: chatName,
                            Id : self.sendId
                        });
                }
                $('#type-message').val('');
            });
            $('#type-message').on('keypress',function(e){
                console.log(e);
                if(e.key== 'Enter'){
                    let message = $('#type-message').val();
                    if(message !== ''){
                        self.socket.emit('send_message',{
                            message:message,
                            user_Name:self.userName,
                            chatRoom: chatName,
                            Id : self.sendId
                        });
                    }
                $('#type-message').val('');
                }
            });
            self.socket.on('recieve_message',function(data){
                console.log('message recieved',data.message);
                let newMessage = $('<li>');
                let messageType = 'other-message';
                if(data.user_Name == self.userName){
                    messageType = 'self-message';
                }
                newMessage.append($('<span>',{
                    html: data.message
                }));
                newMessage.addClass(messageType);
                $('.ul-class ul').append(newMessage);
                scrollTo();
            });
        }
}
let scrollTo = function(){
    let lastChild = document.querySelector('.chat-box li:last-child');
    if(lastChild!=null){
        let bottom = lastChild.getBoundingClientRect().bottom;
        let ulClass = document.querySelector('.ul-class');
        ulClass.scrollBy(0,bottom);
    }
}
let removes = function(){
    let button = $('#remove');
    button.on('click',function(e){
        displayFun();
        e.preventDefault();
        $('.delete-box').remove();
         
    })
}
var count = 0
let displayFun = function(){
    console.log(count);
    if(count == 0){
        $('#friends-container').css({'display':'none'});
        $('#chat-DOM').css({'display':'flex'});
        count+=1;
    }
    else{
        $('#chat-DOM').css({'display':'none'});
        $('#friends-container').css({'display':'flex'});
        count-=1;
    }
}