'use strict'

const keytokenModel = require("../models/keytoken.model");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            //level 0
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })

            // return tokens ? tokens.publicKey : null
            const filter = {userId: userId}, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }, options = {upsert: true, new: true} //upsert: true: nếu chưa có tạo mới còn có rồi thì update

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
            
        } catch (error) {
            console.log("Error when get KeyToken", error);
        }
    }
    
    static findByUserId = async ( userId ) => {
        return await keyTokenModel.findOne({ userId: userId }).lean();
    }
    
    static removeKeyById = async (id) => {
        return await keytokenModel.deleteOne({ _id: id})
    }
}

module.exports = KeyTokenService;
