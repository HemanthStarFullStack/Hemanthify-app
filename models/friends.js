const mongoose  = require('mongoose');
const friends = new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
});
const Friends  = mongoose.model('Friends',friends);
module.exports = Friends;