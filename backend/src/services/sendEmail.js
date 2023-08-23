require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const {createTransport}=require('nodemailer')

function sendEmail(content){
    const transporter=createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        secure:true,
        auth:{
            user:process.env.EMAIL_REACTX,
            pass:process.env.PASSWORD_EMAIL
        }
    })

    const emailToBeSent={
        from:process.env.EMAIL_REACTX,
        to:process.env.EMAIL_REACTX,
        subject:`Contato de ${content.name}`,
        text:`${content.email}\n\n${content.message}`
    }

    transporter.sendMail(emailToBeSent,(err)=>{
        if(err){
            console.log('Email sending failure')
            return
        }

        return
    })
}

module.exports=sendEmail