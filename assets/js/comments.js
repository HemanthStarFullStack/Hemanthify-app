 

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        
        this.newCommentForm = $(`#post-comments-${postId}`);
         
        this.createComment(postId);
        this.commentContainer = $(`#post-listComments-${postId}`);
        let self = this;
        // call for all the existing comments
        console.log($('#deleteButton',  this.commentContainer));
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
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment.comment_id}"> 
                        <small>
                            <a href="/comments/deleteComment/?id=${comment.comment_id}" class="deleteButton">X</a>
                            ${comment.commentor_name}
                            <br>
                            ${comment.commentor_con}
                            <br>
                            <div>
                                <small>
                                    <a href="/likes/toggle/?id=${comment.comment_id}&type=Comment" class="toggle-like"> 0 likes </a>
                                </small>
                            </div>
                        </small>
                </li>`);
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