'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, generateKeys } = require('../auth/authUtils');
const userRole = {
    ADMIN: '0001',
    USER: '0002'
}
const { getInfoData } = require('../utils');
const { generateApiKey, saveApiKeyToUser } = require('./apiKey.service');
const { BadRequestError, AuthFailureError } = require('../../core/error.response');
const { findByEmail } = require('./user.service');

class AccessService {
    /**
     1- check email in DB
     2- match password in DB
     3- create AT and RT in DB
     4- generate token
     5- get data return login
      
     */
    static login = async({email, password, refreshToken = null}) => { //
        //1
        const foundUser = await findByEmail({email});
        if(!foundUser) {
            throw new BadRequestError('Cannot find User')
        }
        
        //2
        const match = bcrypt.compare(password, foundUser.passwordHash)
        if(!match) {
            throw new AuthFailureError('Authentication Error')
        }
        
        //3
        const keys = generateKeys()
        
        //4
        const tokens = await createTokenPair({userId: foundUser.id, email}, keys.public, keys.private)
        
        await KeyTokenService.createKeyToken({
            userId: foundUser.id,
            publicKey: keys.public,
            privateKey: keys.private,
            refreshToken: tokens.refreshToken
        })
        
        return {
            metadata: {
                user: getInfoData({fields : ['_id', 'name', 'email'] , object: foundUser}),
                tokens
            }
        }        
    }
    
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
                   
                // const privateKey = crypto.randomBytes(64).toString('hex')
                // const publicKey = crypto.randomBytes(64).toString('hex')
                const keys = generateKeys();

                const keyStore = await KeyTokenService.createKeyToken({ //save to keytoken collection
                    userId: newUser.id, 
                    publicKey: keys.public,
                    privateKey: keys.private
                })

                if(!keyStore) {
                    throw new BadRequestError('keyStore not found')
                }
                
                //generate accessToken and refreshToken
                const tokens = await createTokenPair({userId: newUser.id, email}, keys.public, keys.private)

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
    
    //authen verify accessToken có phải chính chủ không để logout
    static logout = async({email, password, refreshToken = null}) => {
        
    }
}

module.exports = AccessService;
