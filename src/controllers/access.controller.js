'use strict'

class AccessController {
    signUp = async(req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body)
            /**
             200 OK
             201 CREATE 
             */
            return res.status(201).json({
                code: '2001',
                metadada: {userId: 1}
            })
        } catch (error) {
            console.log("error", error)
        }
    }
}

module.exports = new AccessController()