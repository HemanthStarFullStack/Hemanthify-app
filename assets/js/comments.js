 

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.newCommentForm = $(`#post-comments-${postId}`);
        this.createComment(postId);
        this.commentContainer = $(`#post-listComments-${postId}`);
        let self = this;
        // call for all the existing comments
        $('.deleteButton', this.commentContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        
        let pSelf = this;
        this.newCommentForm.submit(function(e){
           
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/update',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data);
                    $(`#post-listComments-${postId}`).prepend(newComment);
                    console.log($('.deleteButton', newComment));
                    pSelf.deleteComment($('.deleteButton', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        return $(`
        <div class="comment-li-con">
            <li id="comment-${comment.comment_id}"> 
                        <div class="comment-container">
                            <div class="flex-arrangement">
                                <div class="comment-image-class">
                                    <img src="${comment.commentor_avatar}" alt="">
                                </div>
                                <div class="comment-name">
                                    <span>
                                        ${comment.commentor_name}
                                    </span>
                                </div>
                                <div class="comment-content">
                                    <span>
                                        ${comment.commentor_con}
                                    </span>
                                </div>
                            </div>
                            <div class="comment-delete-button">
                              <a href="/comments/deleteComment/?id=${comment.comment_id}"class="deleteButton">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </a>
                            </div>
                        </div>
                        <div class="flex-arrangement-2">
                            <div class="likes-container">
                                    <a href="/likes/toggle/?id=${comment.comment_id}&type=Comment" class="toggle-like" data-likes="<%=comment.likes.lenght%>">
                                             
                                        0
                                        <i class="fa-regular fa-heart"></i>
                                           
                                    </a>
                            </div>
                        </div>
                    </li>
                </div>`);
                }
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    

                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}