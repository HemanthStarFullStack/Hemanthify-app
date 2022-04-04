// {   
//     createPost = function(){
//         let newPostForm = $('#postForm');
//         newPostForm.submit(function(e){
//             console.log(e);
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/post/post_data',
//                 data:newPostForm.serialize(),
//                 success: function(data){
//                     console.log(newPostForm.serialize());
//                     let newPost = newPostDOM(data.data);
//                     let commentData = data.data.postId;
//                     $('#hemanthifyPosts >ul').prepend(newPost);
//                     new Noty({
//                         theme: 'relax',
//                         text: "Post Added",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                     }).show();
//                     new PostComments(commentData);
//                     deletePost($('.delete-post-button', newPost));
//                 },error : function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
     

//     newPostDOM = function(post){
//         return $(`<li id="post-${post.postId}">
//                 <p> 
//                     <a class="delete-post-button" href="/post/delete_post/?id=${post.postId}">X</a>
//                     ${post.postContent}
//                         <br>
//                             <img src=${post.postAvatar} alt="Image Error" width="100" height="100">
//                         <br>
//                     ${post.postUserName}
//                     <div>
//                         <small>
//                             <a href="/likes/toggle/?id=${post.postId}&type=Post" class="toggle-like">0 likes</a>
//                         </small>
//                     </div>
//                     <div class="post-comments"> 
//                             <form action="/comments/update" method="POST" id="post-comments-${post.postId}">
//                                 <input type="text" name= "content" placeholder="add comment">
//                                 <input type="hidden" name ="post" value="${post.postId}">
//                                 <input type="submit" value="add Comment" id="add-${post.postId}">
//                             </form>
//                         <div class="post-comment-list">
//                             <p>
//                                 <ul id="post-listComments-${post.postId}"> 
                                
                                
//                                 </ul>  
//                             </p>
//                         </div>
            
//                     </div>
//                 </p>
//     </li>`)
//     }

//     deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#post-${data.data.post_id}`).remove();
//                     new Noty({
//                         theme: 'relax',
//                         text: "Post Deleted",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         })
//     }
     

//     let deletePostOld= function(){
//         for(post of $('#post-list>li')){
//             let delButton = $(' .delete-post-button',post);
//             deletePost(delButton);
//         };
//     }
//     deletePostOld();
//     createPost();
    
    
// }
// console.log('hello');
// var bool = true
// $('#post-button').on('click',function(e){
//     e.preventDefault();
//     console.log( $('#post-form-con'));
//     if(bool == true){
//         $('#post-form-con').append(`<form action="/post/post_data" id="postForm" method="POST" enctype="multipart/form-data">
//         <textarea name="content" id="newPost" cols="30" rows="3"></textarea>
//         <input type="file" name="postPicture" placeholder="Add Image">
//         <input type="submit" value="submit">
//         </form>`)
//         bool = false;
//     }else{
//         $('#postForm').remove();
//         bool = true;
//     }
    
// });


