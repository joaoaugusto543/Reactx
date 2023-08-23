const {validationResult}=require('express-validator')

function handleValidation(req,res,next){
    const erros=validationResult(req)

    if(erros.isEmpty()){
        return next()
    }

    const extractErrors=[]

    erros.array().map((err)=>extractErrors.push(err.msg))

    return res.status(500).json({errors:extractErrors})
}

module.exports=handleValidation