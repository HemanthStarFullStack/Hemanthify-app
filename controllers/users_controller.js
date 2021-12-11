module.exports.profile = function(req,res){
    console.log("at user_con");
    return res.render('users',{
        title:"usersArea"
    });
}

