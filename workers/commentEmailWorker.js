const kue = require('../config/kue');

const commentsMailer = require('../mailer/comment-mailer');

kue.process('emails',function(job,done){
    commentsMailer.newComment(job.data);
    done();
});