'use strict'
const userModel = require('../models/user.model');

const findByEmail = async({ email, select = {
    email: 1, passwordHash: 2, name: 1, status: 1, role: 1
} }) => {
    return await userModel.findOne({email: email}).select(select);   
}

module.exports = {
    findByEmail
}
