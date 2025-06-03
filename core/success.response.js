'use strict'

const StatusCode = {
    'OK': 200,
    'Created': 201
}

const ReasonStatusCode = {
    OK: 'Success',
    Created: 'Created'
}

class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}}) {
        this.message = !message ? reasonStatusCode : message,
        this.status = statusCode,
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor({message, statusCode = StatusCode.Created, reasonStatusCode = ReasonStatusCode.Created, metadata}){
        super({message, statusCode, reasonStatusCode, metadata})
    }
}



module.exports = {
    OK, CREATED,
    SuccessResponse
}
