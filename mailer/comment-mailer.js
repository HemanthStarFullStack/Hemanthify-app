const nodemailer = require('../config/nodemailer');
 

// functionName = function()
// module.exports   = functionName
// another way

exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'hemanthifyApp@gmail.com',
        to: comment.user.email,
        subject:"newComment",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        return;
    });
}