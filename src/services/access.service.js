'use strict'
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair, generateKeys, refreshAccessToken } = require('../auth/authUtils');
const { userRole } = require('../auth/constant')
const { getInfoData } = require('../utils');
const { generateApiKey, saveApiKeyToUser } = require('./apiKey.service');
const { BadRequestError, AuthFailureError } = require('../../core/error.response');
const { findByEmail } = require('./user.service');
const keytokenModel = require('../models/keytoken.model');

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
        const mapRole = userRole[foundUser.role]

        const tokens = await createTokenPair({userId: foundUser._id, email, role: mapRole}, keys.public, keys.private)
        
        await KeyTokenService.createKeyToken({
            userId: foundUser._id,
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
    
    static signUp = async({name, email, password, role}) => {
        
            const user = await userModel.findOne({email}).lean()
            if(user) {
                throw new BadRequestError('Error: Shop already registered')
            }
            const passwordHash = await bcrypt.hash(password, 10); //thuật toán băm ảnh hưởng cpu nên chỉ cần 10
            const newUser = await userModel.create({
                name,
                email,
                passwordHash: passwordHash,
                role
            });
            
            if(newUser) {
                const apiKey = generateApiKey();
                const mapRole = userRole[role]
                
                await saveApiKeyToUser(apiKey, mapRole, newUser.id);
                   
                const keys = generateKeys();

                const keyStore = await KeyTokenService.createKeyToken({ //save to keytoken collection
                    userId: newUser._id, 
                    publicKey: keys.public,
                    privateKey: keys.private
                })

                if(!keyStore) {
                    throw new BadRequestError('keyStore not found')
                }
                
                //generate accessToken and refreshToken
                const tokens = await createTokenPair({userId: newUser._id, email, mapRole}, keys.public, keys.private)

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
    
    //xóa refreshToken trong db
    //clear cookie
    static logout = async({_id}) => {
       return await KeyTokenService.removeKeyById(_id)
    }

    static handleRefreshToken = async({ refreshToken, user, keyStore }) => {
        const { email, _id } = user;
        const userId = _id.toString();
        
        if(keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.removeKeyById(userId)
            throw new Error('Something happen')
        }

        if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Refresh token not recognized');
        
        const foundUser = await findByEmail({email})
        if(!foundUser) throw new AuthFailureError('User not found');

        //create cap token moi
        const tokens = await createTokenPair({userId, email}, keyStore.publicKey, keyStore.privateKey)

        //update token
        await keytokenModel.updateOne(
            {userId},
            {
              $set: { refreshToken: tokens.refreshToken },
              $addToSet: { refreshTokensUsed: refreshToken }
            }
        )
        
        return {
            user, 
            tokens
        }
    }
}

module.exports = AccessService;
