
const conexion = require('./config_database');
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

// --> app.get('/:ID_ingreso', obtenerpasiente);  -->  ingresoBD.getpasingreso(ID_ingreso ,() => {})
metodos.getingreso = function (fecha_ingreso, callback) {
    consulta = "select * from ingreso where ID_ingreso = ?";

contexion.query(consulta, ID_ingreso, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un ingreso con la ID_ingreso:" fecha_ingreso )
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
    consulta = "select * from ingreso where nombre = ?";

    conexion.query(consulta,nombre , function (err, resultados, fields) {
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

//--> app.put("/:ID_ingreso", modificaringreso);  --> function modificaringreso(req, res) {}
metodos.update = function (datosMedico, deTalMedico, callback) {

    datos = [
        datosingreso.fecha_ingreso,
        datosingreso.nombre,
        datosingreso.apellido,
        datosingreso.nro_cama,
        datosingreso.observaciones,
        parseInt(deTalingreso)
    ];
    consulta = "update ingreso set ID_ingreso = ?, nombre = ?, apellido = ?, nro_cama = ?, observaciones = ? WHERE ID_ingreso = ?";


    conexion.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntro un ingreso con la ID_ingreso  ${deTalingreso}`,
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

    conecxionon.query(consulta, ingreso, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un ingreso con ese Dni  " + datodingreso.id_ingreso,
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
                message: "el ingreso" + datosingreso.Dni + " " + datosingreso.ID_ingreso + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

// -->  app.delete("/:fecha_ingreso", eliminaringreso);   -->   ingresoBD.metodos.deleteingreso(req.params.nnssBIGNT, (err, exito) => {}); 
metodos.deleteingreso = function (fecha_ingreso, callback) {
    query = "delete from ingreso where fecha_ingreso = ?";
    ingreso.query(query,fecha_ingreso , function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un pasiente con la  ID_ingreso" + fecha_ingreso);
        } else {
            callback(undefined, "el ingreso " + ID_ingreso + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
