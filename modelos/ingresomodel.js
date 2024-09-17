const conexion = require('./config_database');

var metodos = {}

// --> app.get("/", listarTodo());  --> ingreso = ingreso.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from ingreso";
    conexion.query(consulta, function (err, resultados, fields) {
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

// --> app.get('/:fecha -ingreso', obteneringreso);  -->  ingreso.getingreso(fecha -ingreso, () => {})
metodos.getMedicos = function (matricula, callback) {
    consulta = "select * from  ingresonwhere matricula = ?";

    conexion.query(consulta, fecha_ingreso,dni, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un ingreso con fecha_ingreso:" + dni)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getByfecha_ingreso = function (fecha_ingreso, callback) {
    consulta = "select * from ingreso where fecha_ingreso = ?";

    conexion.query(consulta, fecha_ingreso, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un ingreso con la fecha_ingreso:" + fecha_ingreso)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con la fecha_ingreso" + fecha_ingreso,
                    detail: resultados,
                });
            }
        }

    });

}

//--> app.put("/:dni", modificaringreso);  --> function modificaringreso(req, res) {}
metodos.update = function (datosMedicos, deTalMedicos, callback) {

    datos = [
        datosingreso.,
       datosingreso.nombre,
        datosingreso.apellido,
        datosingreso.nro_cama,
        datosingreso.historial_pasiente,
    ];
    consulta =
        "INSERT INTO consulte (Dni, nombre, apellido, nro_cama, historial_pasiente) VALUES (?, ?, ?, ?, ?)";

    ingreso.query(consulta, ingreso, (err, rows) => {
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
