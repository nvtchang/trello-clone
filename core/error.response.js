'use strict'

const StatusCode = {
    'Forbidden': 403,
    'Conflict': 409,
    'Server Errors': 500
}

const ReasonStatusCode = {
    Forbidden: 'Bad Request',
    Conflict: 'Conflict Error'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message) 
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.Forbidden, statusCode = StatusCode.Forbidden) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.Forbidden, statusCode = StatusCode.Forbidden) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}
