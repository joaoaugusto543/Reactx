const bcrypt=require('bcryptjs')

async function encryptPassword(password){
    const encryptedPassword=await bcrypt.hash(password,8)
    return encryptedPassword
}

async function verifyPassword(user,password){
    return await bcrypt.compare(password,user.password)
}

const cryptography={
    encryptPassword,
    verifyPassword,
}

module.exports=cryptography
