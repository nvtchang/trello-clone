'use strict'
const userModel = require('../models/user.model');

class AccessService {
    static signUp = async({name, email, phone}) => {
        try {
            const user = await userModel.findOne({email}).lean()
            if(user) {
                return {
                    code: 'xxxx',
                    message: 'duplicate user'
                }
            }

            const newUser = new userModel({
                name: 'john_doe',
                email: 'john.doe@example.com'
            });
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}