const sendEmail = require("../services/sendEmail")

async function support(req,res){
    try {

        const {name,email,message}=req.body

        if(!name || !email || !message){
            return res.status(500).json({error:'Invalid contact'})
        }

        await sendEmail({name,email,message})

        return res.status(200).json({success:'Send email'})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Internal error.'})
    }
}

const supportControllers={
    support
}

module.exports=supportControllers