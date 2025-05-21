'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userRole = {
    ADMIN: '0001',
    USER: '0002'
}

class AccessService {
    static signUp = async({name, email, password}) => {
        try {
            const user = await userModel.findOne({email}).lean()
            if(user) {
                return {
                    code: 'xxxx',
                    message: 'duplicate user'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10); //thuật toán băm ảnh hưởng cpu nên chỉ cần 10
            const newUser = new userModel.create({
                name,
                email,
                passwordHash: passwordHash,
                roles: [userRole.ADMIN]
            });

            if(newUser) {
                //created privateKey: sign token, publicKey: verify token
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    moduleLength: 4096
                })
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}