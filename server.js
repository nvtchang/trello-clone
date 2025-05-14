//khai bao port khoi dong server

const app = require("./src/app");

const port = 3055;

const server = app.listen(port, () => {
    console.log(`Trello clone start with port ${port}`);
})

process.on('SIGINT', () => {
    server.close( () => console.log('Exit Server Express'))
    //notify.send(ping...) notify if app crash
})