const ejs  = require("ejs");
const nodemailer = require("nodemailer");
const path = require('path');

let transporter = nodemailer.createTransport({
    service :'gmail',
    host: 'smtp.gmail.com',
    port : 587,
    secure:false,
    auth:{
       user:'hemanthifyApp@gmail.com',
       pass:'shscstncs1' 
    }

});


let renderTemplate  = (data, relativePath)=>{
    console.log(".............................renderTemp");
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            console.log(relativePath);
          
            if(err){
                console.log(data);
                console.log("mailer",err);
            }
            mailHtml = template
        }
    
    )
     
    return mailHtml;

}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}