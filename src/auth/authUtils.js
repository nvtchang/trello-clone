'use strict'
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { asyncHandler } = require('../helper/asyncHandler');
const { NotFoundError, AuthFailureError } = require("../../core/error.response")
const KeyTokenService = require("../services/keyToken.service")

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        
        const accessToken = jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
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
    //get token from cookie
    const refreshToken = req.cookies?.refreshToken;
    //decode token
    const decoded = jwt.decode(refreshToken);
    
    const userId = decoded.userId
    if (!userId) throw new NotFoundError('No token provided');
    
    //used useId to find public key
    const keyToken = await KeyTokenService.findByUserId(userId)
    if(!keyToken || !keyToken.publicKey) throw new NotFoundError('Invalid token')
        
    //use privateKey to verify token
    try {
        const verifiedPayload  = jwt.verify(refreshToken, keyToken.privateKey)  
        
        if(!verifiedPayload) throw new AuthFailureError('Invaild account')
        req.keyToken = keyToken
        return next()
        
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    generateKeys,
    authentication
}
