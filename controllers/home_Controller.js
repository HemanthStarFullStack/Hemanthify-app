module.exports.home = function(req,res){
    return res.render('home',{
        title:'home'

    });
}

// (common syntax)module.exports.action = function(req,res)