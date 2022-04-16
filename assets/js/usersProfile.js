{
    createFriend = function(){
        target = $('.friendButton')
        let newPostForm1 = $('#addFriend');
        newPostForm1.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'Post',
                url:"/users/friends",
                data: newPostForm1.serialize(),
                success: function(data){
                    if(data.data.bools == true){
                        $(target).html("UnFollow")
                        $(target).removeAttr("id","button-id")
                    }
                    else if(data.data.bools == false){
                        $(target).html("Follow")
                        $(target).attr("id","button-id")
                    }
                },
                error: function(err){
                    console.log(err)
                }
            });
        });
    
    }
    createFriend();
  
}



// {
//     document.addEventListener('click',function(e){
//         Target = e.target;
//         if(Target.className == "friendButton"){
//             e.preventDefault();
//             ButtonToggler(Target );
//         }
//     });
//     ButtonToggler = function(Target){
//         $.ajax({
//             type:'Post',
//             url:'/users/friends/:senderId/:paramsId',
//             success: function(data){
//                 console.log(data.data.bools)
//                 if(data.data.bools == true){
//                     $(Target).html("UnFriend")
//                 }
//                 else if(data.data.bools == false){
//                     $(Target).html("Add Friend")
//                 }
//             },
//             error: function(err){
//                 console.log(err)
//             }
//         });
//     }
// }