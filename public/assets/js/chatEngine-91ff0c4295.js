class Custom_call{constructor(e){this.id=e,this.form=$(`#chat-${this.id}`),console.log(this.form);let s=this;this.form.submit((function(e){e.preventDefault(),s.custom_ChatRoom()}))}custom_ChatRoom=function(){$.ajax({type:"post",url:"/chat/chatroom",data:this.form.serialize(),success:function(e){console.log(e),displayFun(),new ChatEngine(e.data.recId,e.data.sendId,e.data.recName,e.data.messageData,e.data.rec_data)}})}}class ChatEngine{constructor(e,s,t,n,o){this.recId=e,this.sendId=s,this.userName=t,this.messageData=n,this.rec_data=o,console.log("recieverId",this.recId),console.log("senderId",this.sendId),console.log("userName",this.userName),this.DOMhtml=this.newChaDOM(this.messageData,this.rec_data),$(".delete-box").remove(),this.chatDOM=$("#chat-DOM"),this.chatDOM.prepend(this.DOMhtml),$("#remove2").remove(),scrollTo(),removes(),this.socket=io.connect("http://43.204.29.107:5000"),this.userName&&this.connectionHandler()}newChaDOM=function(e,s){let t=this;return $(` <div id ="chat-container" class="delete-box">\n                                <div class="user-details">\n                                    <div id="image">\n                                        <img src="${s.avatar}" alt="">\n                                        <span>\n                                            ${s.name}\n                                        </span>\n                                    </div>\n                                    <div class="remove">\n                                        <button id="remove">\n                                            <i class="fa-solid fa-circle-arrow-left"></i>\n                                        </button>\n                                    </div>\n                                </div>\n                                <div class="ul-class">\n                                    <ul class="chat-box">\n                                    ${null==e?"":e.messages.map((function(e){return e.User==t.sendId?`<li class="self-message">${e.message}</li>`:`<li class="other-message">${e.message}</li>`})).join("")}\n                                    </ul>\n                                </div>\n                                <div id="input-id">\n                                    <input type="text" name="Message" id="type-message" placeholder="type your message............">\n                                    <button id="send-message">\n                                        <i class="fa-solid fa-paper-plane"></i>\n                                    </button>\n                                </div>\n                            </div>`)};connectionHandler(){console.log("$$$$$$$$$$$$$$$$$$$$$$$$");let e=this,s=[e.recId,e.sendId];s.sort();let t=s[0]+"-"+s[1];console.log(t),console.log(s),this.socket.on("connect",(function(){console.log("Connection Established"),e.socket.emit("join_room",{user_email:this.userName,chatRoom:t}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)}))})),$("#send-message").click((function(){let s=$("#type-message").val();console.log(s),""!==s&&e.socket.emit("send_message",{message:s,user_Name:e.userName,chatRoom:t,Id:e.sendId}),$("#type-message").val("")})),$("#type-message").on("keypress",(function(s){if(console.log(s),"Enter"==s.key){let s=$("#type-message").val();""!==s&&e.socket.emit("send_message",{message:s,user_Name:e.userName,chatRoom:t,Id:e.sendId}),$("#type-message").val("")}})),e.socket.on("recieve_message",(function(s){console.log("message recieved",s.message);let t=$("<li>"),n="other-message";s.user_Name==e.userName&&(n="self-message"),t.append($("<span>",{html:s.message})),t.addClass(n),$(".ul-class ul").append(t),scrollTo()}))}}let scrollTo=function(){let e=document.querySelector(".chat-box li:last-child");if(null!=e){let s=e.getBoundingClientRect().bottom;document.querySelector(".ul-class").scrollBy(0,s)}},removes=function(){$("#remove").on("click",(function(e){displayFun(),e.preventDefault(),$(".delete-box").remove()}))};var count=0;let displayFun=function(){console.log(count),0==count?($("#friends-container").css({display:"none"}),$("#chat-DOM").css({display:"flex"}),count+=1):($("#chat-DOM").css({display:"none"}),$("#friends-container").css({display:"flex"}),count-=1)};