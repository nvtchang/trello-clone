'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey.toString() //public key la buffer chua duoc hash, chuyển về string để lưu vào DB
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })

            return tokens ? publicKeyString : null

        } catch (error) {
            console.log("Error when get KeyToken", error);
        }
    }
}

module.exports = KeyTokenService;