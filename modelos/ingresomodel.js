require('rootpath')();

const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');
// Agregue las credenciales para acceder a su base de datos
const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

var metodos = {}

// --> app.get("/", listarTodo());  --> ingreso = ingresosBD.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from ingreso";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}

// --> app.get('/:fecha_ingreso', obtenerpasiente);  -->  ingresoBD.getpasingreso(fecha_ingreso ,() => {})
metodos.getMedico = function (matricula, callback) {
    consulta = "select * from ingreso where fecha_ingreso = ?";

    connection.query(consulta, fecha_ingreso, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un ingreso con la fecha_ingreso:" +nnssBIGNT )
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getByfecha_ingreso = function (nnssBIGNT, callback) {
    consulta = "select * from ingreso where nombre = ?";

    connection.query(consulta,nombre , function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un ingreso con nombre :" + nombre)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con nombre" + nombre,
                    detail: resultados,
                });
            }
        }

    });

}

//--> app.put("/:fecha_ingreso", modificaringreso);  --> function modificaringreso(req, res) {}
metodos.update = function (datosMedico, deTalMedico, callback) {

    datos = [
        datosingreso.nnssBIGNT,
        datosingreso.nombre,
        datosingreso.apellido,
        datosingreso.nro_cama,
        datosingreso.observaciones,
        parseInt(deTalingreso)
    ];
    consulta = "update ingreso set fecha_ingreso = ?, nombre = ?, apellido = ?, nro_cama = ?, observaciones = ? WHERE fecha_ingreso = ?";


    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntro un ingreso con la fecha_ingreso  ${deTalingreso}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `el ingreso ${datosMedico.nombre} se actualizo correctamente`,
                    detail: rows,
                })
            }

        }
    });


}

//--> ingresoBD.metodos.crearingreso(req.body, (err, exito) => {});
metodos.crearingreso = function (datospasiente, callback) {
    ingreso = [
        datosingreso.Dni,
        datosingreso.nombre,
        datosingreso.apellido,
        datosingreso.nro_cama,
        datosingreso.historial_pasiente,
    ];
    consulta =
        "INSERT INTO consulte (Dni, nombre, apellido, nro_cama, historial_pasiente) VALUES (?, ?, ?, ?, ?)";

    connection.query(consulta, ingreso, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un ingreso con ese Dni  " + datospasiente.nnssBIGNT,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "otro error que no conocemos",
                    detail: err.sqlMessage
                })
            }


        } else {
            callback(undefined, {
                message: "el ingreso" + datosingreso.Dni + " " + datosingreso.fecha_ingreso + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

// -->  app.delete("/:fecha_ingreso", eliminaringreso);   -->   ingresoBD.metodos.deleteingreso(req.params.nnssBIGNT, (err, exito) => {}); 
metodos.deleteingreso = function (fecha_ingreso, callback) {
    query = "delete from ingreso where fecha_ingreso = ?";
    connection.query(query,fecha_ingreso , function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un pasiente con la  fecha_ingreso" + fecha_ingreso);
        } else {
            callback(undefined, "el ingreso " + fecha_ingreso + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }