{function toggle(e){$.ajax({type:"Post",url:e.href,success:function(t){if(1==t.data.deleted){console.log(t);let a=parseInt(e.dataset.likes);$(e).attr("data-likes",a),$(e).html(`${t.data.likesLen} <i class="fa-regular fa-heart"></i>`)}else{console.log(t);let a=parseInt(e.dataset.likes);$(e).attr("data-likes",a),$(e).html(`${t.data.likesLen} <i class="fa-solid fa-heart"></i>`)}},error:function(e){console.log(e)}})}document.addEventListener("click",(function(e){let t=e.target;"toggle-like"==t.className&&(e.preventDefault(),toggle(t))}))}