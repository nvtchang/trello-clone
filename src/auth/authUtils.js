'use strict'
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { asyncHandler } = require('../helper/asyncHandler');
const { NotFoundError, AuthFailureError } = require("../../core/error.response")
const KeyTokenService = require("../services/keyToken.service")
const { findByEmail } = require("../services/user.service")

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {        
        const accessToken = jwt.sign(payload, publicKey, {
            expiresIn: '4h'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        //debug login 
        // jwt.verify(accessToken, publicKey, function(err, decode) {
        //     if(err) {
        //         console.error('Error when verify accessToken', err)
        //     } else {
        //         console.log('',decode)
        //     }
        // })

        return {accessToken, refreshToken}
    } catch (error) {
        
    }
}

const generateKeys = () => {
    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    return {
        "private": privateKey, 
        "public": publicKey 
    };
}

const authentication = asyncHandler(async (req, res, next) => {
    //get accessToken from header
    const accessToken = req.headers.authorization;
    
    if (!accessToken) {
        throw new AuthFailureError('Access token missing');
    }
    //decode token
    const decoded = jwt.decode(accessToken);
        
    if (!decoded?.userId) throw new AuthFailureError('Invalid access token');

    const userId = decoded.userId
    if (!userId) throw new NotFoundError('No token provided');
    
    //used useId to find public key
    const keyToken = await KeyTokenService.findByUserId(userId)
    if(!keyToken || !keyToken.publicKey) throw new NotFoundError('Invalid token')
        
    //use publicKey to verify token
    try {
        const verifiedPayload  = jwt.verify(accessToken, keyToken.publicKey)  
        
        if(!verifiedPayload) throw new AuthFailureError('Invaild account')
        req.keyToken = keyToken
        return next()
        
    } catch (error) {
        throw error
    }
})

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
    //get refreshToken from cookie
    //decoded token
    //get the user
    //get keystore
    //verify the refreshToken
    //assign to request
    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken) {
        throw new AuthFailureError('Refresh token not provided')
    }
    
    const decoded = jwt.decode(refreshToken);
    
    const userId = decoded.userId;
    const email = decoded.email;
    
    if (!userId || !email) throw new AuthFailureError('Invalid refresh token');

    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore || !keyStore.publicKey) throw new NotFoundError('Key store not found');
    
    const user = await findByEmail({ email });
    if (!user) throw new AuthFailureError('User not found');
    req.user = user;
    req.keyStore = keyStore;
    
    next();
    
})
module.exports = {
    createTokenPair,
    generateKeys,
    authentication,
    verifyRefreshToken
}
