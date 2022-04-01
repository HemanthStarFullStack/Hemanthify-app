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
                console.log(data);
                let likeData = parseInt(target.dataset.likes);
                $(target).attr('data-likes',likeData);
                $(target).html(`${data.data.likesLen} likes`)
            },
            error: function(err){
                console.log(err);
            }
        })
    }
}