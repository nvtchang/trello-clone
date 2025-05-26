'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
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
            const newUser = await userModel.create({
                name,
                email,
                passwordHash: passwordHash,
                roles: [userRole.ADMIN]
            });
            console.log("newUser", newUser)
            if(newUser) {
                //created privateKey: sign token, publicKey: verify token
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })
                console.log({ privateKey, publicKey })

                const publicKeyString = await KeyTokenService.createKeyToken({ //save to keytoken collection
                    userId: newUser.id, 
                    publicKey
                })

                if(!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString not found'
                    }
                }

                //generate accessToken and refreshToken
                const tokens = await createTokenPair({userId: newUser.id, email}, publicKey, privateKey)

                return {
                    code: 201,
                    metadata: {
                        user: newUser,
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
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

module.exports = AccessService;