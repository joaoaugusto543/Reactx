const {body}=require('express-validator')
const { select } = require('../config/db')
const { verifyPassword } = require('../services/cryptography')

function validationUpdateUser(){

    return [
        body('name')
            .optional()
            .isString()
            .withMessage('Name is required')
            .isLength({min:3})
            .withMessage('The name must be at least three characters long'),
        body('email')
            .optional()
            .isString()
            .withMessage('E-mail is required')
            .isEmail()
            .withMessage('Invalid email'),
        body('birthday')
            .optional()
            .isString()
            .withMessage('Birthday is required')
            .custom((value)=>{
            
                const regexValidateDate=/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                const date = new Date()
                const currentDay = String(date.getDate()).padStart(2, '0')
                const currentMonth = String(date.getMonth() + 1).padStart(2, '0')
                const currentYear = date.getFullYear()
    
                const [day,month,year]=value.split('/')

                if(!regexValidateDate.test(value) || year > currentYear){
                    throw new Error('Invalid date')
                }
        
                if(currentYear-year>18 || (currentYear-year===18 && month < currentMonth) || (currentYear-year===18 && month === currentMonth && day <= currentDay)){
                    return true
                }

                throw new Error('Minors cannot create a checking account')
    
            }),
        body('newPassword')
            .optional()
            .isString()
            .withMessage('Password is required')
            .isLength({min:6})
            .withMessage('Password must be at least 6 characters long')
            .custom(async (value,{req})=>{

                const {password}=req.body

                const user=req.user

                if(!await verifyPassword(user,password)){
                    throw new Error('Incorrect password')
                }

                if(value!==req.body.confirmPassword){
                    throw new Error('Passwords need to be the same')
                }

                return true
            }),
        body('gender')
            .optional()
            .isString()
            .withMessage('Gender is required')
            .custom((value)=>{
                if(value==='Masculino' || value==='Feminino' || value==='Outro'){
                    return true
                }

                throw new Error('Invalid gender')
            }),
        body('phone')
            .optional()
            .isString()
            .withMessage('Phone is required')
            .custom((value)=>{
                const regexPhone=/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/

                if(!regexPhone.test(value)){
                    throw new Error('Invalid phone')
                }

                return true
            }),
        body('rg')
            .optional()
            .isString()
            .withMessage('Rg is required')
            .custom((value)=>{
                const regexRg=/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/

                if(!regexRg.test(value)){
                    throw new Error('Invalid RG')
                }

                return true
            }),
        body('state')
            .optional()
            .isString()
            .withMessage('State is required')
            .custom(async (value,{req})=>{
 
                const city=req.body.city

                if(!city){
                    throw new Error('To change state you have to change city')
                }

                const table='states'
                const condition=`uf = '${value}'`
                const columns='*'

                const state= (await select(table,columns,condition))[0]

                if(!state){
                    throw new Error('Invalid state')
                }

                return true
            }),
        body('city')
            .optional()
            .isString()
            .withMessage('City is required')
            .custom(async (value,{req})=>{

                const state=req.body.state
                const table='cities'
                const condition=`name = '${value}' AND uf = '${state}'`
                const columns='*'

                const city= (await select(table,columns,condition))[0]

                if(!city){
                    throw new Error('Invalid city')
                }

                return true
            })
    ]

}

const usersValidation={
    validationUpdateUser
}

module.exports=usersValidation