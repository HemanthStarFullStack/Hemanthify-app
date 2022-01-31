{   

    let createPost = function(){
        let newPostForm = $('#postForm');
         
        newPostForm.submit(function(e){
            console.log(e);
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/post_data',
                data:newPostForm.serialize(),
                success: function(data){
                    
                    let newPost = newPostDOM(data.data);
                    let commentData = data.data.postId;
                    $('#hemanthifyPosts >ul').prepend(newPost);
                    new Noty({
                        theme: 'relax',
                        text: "Post Added",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    new PostComments(commentData);
                    deletePost($('.delete-post-button', newPost));
                    
                     

                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
     

    let newPostDOM = function(post){
        return $(`<li id="post-${post.postId}">
                <p> 
                    
                    <a class="delete-post-button" href="/post/delete_post/?id=${post.postId}">X</a>
                   
                    ${post.postContent}
                    <br>
                    ${post.postUserName}
                    
                    <div class="post-comments"> 
                        
                            <form action="/comments/update" method="POST" id="post-comments-${post.postId}">
                                <input type="text" name= "content" placeholder="add comment">
                                <input type="hidden" name ="post" value="${post.postId}">
                                <input type="submit" value="add Comment" id="add-${post.postId}">
                            </form>
                        <div class="post-comment-list">
                            <p>
                                <ul id="post-listComments-${post.postId}"> 
                                
                                
                                </ul>  
                            </p>
                        </div>
            
                    </div>
                </p>
    </li>`)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    let deletePostOld= function(){
        for(post of $('#post-list>li')){
            deletePost($('.delete-post-button' , post));
        }
    }
     
    createPost();
    deletePostOld();
    
}