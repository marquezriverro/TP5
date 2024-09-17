const conexion = require('./config_database');

var metodos = {}

// --> app.get("/", listarTodo());  --> pasientes = pasientesBD.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from pasiente";
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

// --> app.get('/:nnssBIGNT', obtenerpasiente);  -->  pasienteBD.getpasiente(nnssBIGNT, () => {})
metodos.getMedico = function (matricula, callback) {
    consulta = "select * from pasiente where nnssBIGNT = ?";

    conexion.query(consulta, nnssBIGNT, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un pasiente con la nnssBIGNT:" +nnssBIGNT )
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getBynnssBIGNT = function (nnssBIGNT, callback) {
    consulta = "select * from pasiente where nombre = ?";

    conexion.query(consulta,nombre , function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un pasiente con nombre :" + nombre)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con nombre" + nombre,
                    detail: resultados,
                });
            }
        }

    });

}

//--> app.put("/:nnssBIGNT", modificarpasiente);  --> function modificarpasiente(req, res) {}
metodos.update = function (datosMedico, deTalMedico, callback) {

    datos = [
        datospasiente.nnssBIGNT,
        datospasiente.nombre,
        datospasiente.apellido,
        datospasiente.nro_cama,
        datospasiente.observaciones,
        parseInt(deTalpasiente)
    ];
    consulta = "update pasiente set nnssBIGNT  = ?, nombre = ?, apellido = ?, nro_cama = ?, observaciones = ? WHERE nnssBIGNT = ?";


    conexion.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntro un pasiente con la nombre  ${deTalpasiente}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `el pasiente ${datospasiente.nombre} se actualizo correctamente`,
                    detail: rows,
                })
            }

        }
    });


}

//--> pasienteBD.metodos.crearpasiente(req.body, (err, exito) => {});
metodos.crearpasiente = function (datospasiente, callback) {
    pasiente = [
        datospasiente.nnssBIGNT,
        datospasiente.nombre,
        datospasiente.apellido,
        datospasiente.nro_cama,
        datospasiente.observaciones,
    ];
    consulta =
        "INSERT INTO consulte (nnssBIGNT, nombre, apellido, nro_cama, observaciones) VALUES (?, ?, ?, ?, ?)";

    conexion.query(consulta, medico, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un pasiente con ese nnssBIGNT " + datospasiente.nnssBIGNT,
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
                message: "el pasiente " + datospasiente.nombre + " " + datospasiente.apellido + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

// -->  app.delete("/:nnssBIGNT", eliminarpasiente);   -->   pasienteBD.metodos.deletepasiente(req.params.nnssBIGNT, (err, exito) => {}); 
metodos.deletepasiente = function (matricula, callback) {
    query = "delete from pasiente where nombre = ?";
    conexion.query(query,nnssBIGNT , function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un pasiente con la nnssBIGNT " + nnssBIGNT);
        } else {
            callback(undefined, "el pasiente " + nnssBIGNT + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
