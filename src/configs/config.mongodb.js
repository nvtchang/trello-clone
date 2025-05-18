//level 0
// const config = {
//     app: {
//         port: 3000
//     },
//     db: {
//         host: 'localhost', 
//         port: '27017',
//         db: 'trello_clone'
//     }
// }

//level 1 

const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        host: process.env.DEV_DB_HOST, 
        port: process.env.DEV_DB_PORT,
        dbName: process.env.DEV_DB_NAME
    }
}

const prod = {
    app: {
        port: process.env.PROD_APP_PORT
    },
    db: {
        host: process.env.PROD_DB_HOST, 
        port: process.env.PROD_DB_PORT,
        dbName: process.env.PROD_DB_NAME
    }
}

const config = { dev, prod};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];