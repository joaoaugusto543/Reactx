const { encryptPassword, verifyPassword} = require("../../services/cryptography")

describe('Cryptography',()=>{

    it('EncryptPassword and verifyPassword',async ()=>{

        const password='123456'

        const encryptedPassword=await encryptPassword(password)

        const user={
            password:encryptedPassword
        }

        const checkPassword=await verifyPassword(user,password)

        expect(checkPassword).toBeTruthy()

    })

    it('Error encryptPassword and verifyPassword',async ()=>{

        const password='123456'

        const encryptedPassword=await encryptPassword(password)

        const user={
            password:encryptedPassword
        }

        const wrongPassword='327634276'

        const checkPassword=await verifyPassword(user,wrongPassword)

        expect(checkPassword).toBeFalsy()

    })


})