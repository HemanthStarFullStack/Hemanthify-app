{
    document.addEventListener('click',function(e){
        let Tar = e.target;
        if(Tar.className =="toggle-like"){
            e.preventDefault();
            toggle(Tar)
        }
    })
    function toggle(target){
        $.ajax({
            type: 'Post',
            url :target.href,
            success: function(data){
                if(data.data.deleted == true){
                    
                    let likeData = parseInt(target.dataset.likes);
                    $(target).attr('data-likes',likeData);
                    $(target).html(`${data.data.likesLen} <i class="fa-regular fa-heart"></i>`)
                }
                else{
                     
                    let likeData = parseInt(target.dataset.likes);
                    $(target).attr('data-likes',likeData);
                    $(target).html(`${data.data.likesLen} <i class="fa-solid fa-heart"></i>`)
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    }
}