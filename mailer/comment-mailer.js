const nodemailer = require('../config/nodemailer');
 

// functionName = function()
// module.exports   = functionName
// another way

exports.newComment = (comment)=>{
    console.log("$$$$$$$$$$$$$$",comment.user.email);
    console.log('inside comment mailer');
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log(htmlString)
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
        console.log('message sent');
        return;
    });
}