const mysql = require("mysql");
const misconfiguraciones = require("config.json");

const unanuevaconnection = mysql.createConnection(misconfiguraciones.database);



unanuevaconnection.connect((err) => {
    if (err) {
        console.log(err.code);
   const connection = mysql.createConnection(configuracion.database);
 } else {
        console.log("BD conectada");
    }
});

module.exports = unanuevaconnection
