const Friend = require('../models/friends');
const User = require('../models/user')
module.exports.friends = async function(req,res){
    let bools = false
    let obj =await Friend.findOne({
        from_user:req.body.senderId,
        to_user : req.body.recieverId
    });
    let sender = await User.findById(req.body.senderId);
    let reciever = await User.findById(req.body.recieverId);
    if(req.xhr){
        if(obj){
            await sender.following.pull(obj.to_user);
            await reciever.follower.pull(obj.from_user);
            obj.remove();
            sender.save();
            reciever.save();
            return res.json({
                message:"FriendShip Destroyed",
                data:{
                    bools:bools
                }
            })
        }
    }
    let friObj = await Friend.create({
        from_user:req.body.senderId,
        to_user : req.body.recieverId
    });
    await sender.following.push(friObj.to_user);
    await reciever.follower.push(friObj.from_user);
    sender.save();
    reciever.save();
    if(friObj){
        bools = true
    }
    if(req.xhr){
        return res.json({
            message:"FriendShip Established",
            data:{
                bools: bools
            }
        })
    }
    return res.redirect('/');
}