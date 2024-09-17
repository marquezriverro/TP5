const mysql = require("mysql");
const misconfiguraciones = require("config.json");

const db = mysql.createConnection(misConfiguraciones.database);


db.connect((err) => {
    if (err) {
        console.log(err.code);
   const connection = mysql.createConnection(configuracion.database);
 } else {
        console.log("BD conectada");
    }
});

module.exports = db
