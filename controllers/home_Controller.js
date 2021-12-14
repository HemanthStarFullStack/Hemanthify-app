module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',35)
    return res.render('home',{
        title:'home'

    });
}

// (common syntax)module.exports.action = function(req,res)