'use strict';

let mongoose = require("mongoose");

module.exports = ({host, port, dbname, user, password}) => {

    var status = {
        connection: '',
        dao: null,
        connected: false,
        uri : "mongodb://" + host + ":" + port + "/" + dbname
    };

    console.info("Iniciando conexão com mongo...");

    mongoose.connect(status.uri, {server: {poolSize: 5}});

    mongoose.connection.on("connected", () => {
        console.info("Mongo connectado em " + dbname);
        status.connection = mongoose;
        status.connected = true;
    });

    mongoose.connection.on("error", (err) => {
        console.error(new Error('Tentativa de conexão com mongo falhou!'), err);
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.info("Moongose! Desconnectado pelo término da aplicação.");
            process.exit(0);
        });
    });

    return status;
};
