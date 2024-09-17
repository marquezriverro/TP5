
const express = require('express');
const config = require('./src/config/config.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const medicosController = require('./TP5/controller/medicos');
const ingresoController = require('./TP5/controller/ingreso');
const pasienteController = require('./TP5/controller/pasiente');

app.use("/medicos", medicosController); //ejemplo de peticion --> https://localhost:8080/medicos/listar
 app.use('/ingreso', ingresoController);
 app.use('/reserva', pasienteController);

function startServer(puerto) {
    const server = app.listen(puerto, () => {
        console.log(`Servidor escuchando en: http://localhost:${puerto}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
            puerto++;
            startServer(puerto); // Intenta con el siguiente puerto
        } else {
            console.error("Error al iniciar el servidor:", err);
        }
    });
}

// invocamos la funcion que intenta iniciar el servidor en el puerto que le pasemos
startServer(config.server.port);

module.exports = app;
