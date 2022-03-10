{
    document.addEventListener('click',function(e){
        Tar = e.target;
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
                let likeData = parseInt(Tar.dataset.likes);
                $(Tar).attr('data-likes',likeData);
                $(Tar).html(`${data.data.likesLen} likes`)
            }
        })
    }
}