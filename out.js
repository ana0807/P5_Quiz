const figlet = require('figlet');
const chalk = require ('chalk');

//Dar color a un string
const colorize = (msg,color) =>{
    if (typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

// Escribe un mensaje de log
const log = (socket, msg,color) => {
    socket.write(colorize(msg, color) + "\n");
};

//Escribe un mensaje de log grande
const biglog = (socket ,msg, color) => {
    log(figlet.textSync(msg, {horizontalLayout: 'full'}), color);
};

//Escribe el mensaje de error emsg
const errorlog = (socket, emsg) =>{
    socket.write(`${colorize("error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}\n`);
};

exports = module.exports = {
    colorize,
    log,
    biglog,
    errorlog
};