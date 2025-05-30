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
const { getInfoData } = require('../utils');
const { generateApiKey, saveApiKeyToUser } = require('./apiKey.service');
const { BadRequestError } = require('../../core/error.response');

class AccessService {
    static signUp = async({name, email, password}) => {
            const user = await userModel.findOne({email}).lean()
            if(user) {
                throw new BadRequestError('Error: Shop already registered')
            }
            const passwordHash = await bcrypt.hash(password, 10); //thuật toán băm ảnh hưởng cpu nên chỉ cần 10
            const newUser = await userModel.create({
                name,
                email,
                passwordHash: passwordHash,
                roles: [userRole.ADMIN]
            });
            
            if(newUser) {
                const apiKey = generateApiKey();
                await saveApiKeyToUser(apiKey, ['000'], newUser.id);
                   
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({ privateKey, publicKey })

                const keyStore = await KeyTokenService.createKeyToken({ //save to keytoken collection
                    userId: newUser.id, 
                    publicKey,
                    privateKey
                })

                if(!keyStore) {
                    throw new BadRequestError('keyStore not found')
                }
                
                //generate accessToken and refreshToken
                const tokens = await createTokenPair({userId: newUser.id, email}, publicKey, privateKey)

                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({fields : ['_id', 'name', 'email'] , object: newUser}),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
    }
}

module.exports = AccessService;
