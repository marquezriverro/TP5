//codigo encargado de gestionar los datos con la base de datos de los medicos

const conexion = require('./config_database');

var metodos = {}

// --> app.get("/", listarTodo());  --> medicos = medicos.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from medicos";
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

// --> app.get('/:matricula', obtenerMedicos);  -->  medicos.getMedicos(matricula, () => {})
metodos.getMedicos = function (matricula, callback) {
    consulta = "select * from medicos where matricula = ?";

    conexion.query(consulta, matricula, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un medico con la matricula:" + matricula)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getByEspecialidad = function (especiliadad, callback) {
    consulta = "select * from medicos where especialidad = ?";

    conexion.query(consulta, especiliadad, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un medico con la especialidad:" + especiliadad)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta con la especialidad" + especiliadad,
                    detail: resultados,
                });
            }
        }

    });

}

//--> app.put("/:matricula", modificarMedicos);  --> function modificarMedicos(req, res) {}
metodos.update = function (datosMedicos, deTalMedicos, callback) {

    datos = [
        datosMedicos.matricula,
        datosMedicos.nombre,
        datosMedicos.apellido,
        datosMedicos.especialidad,
        datosMedicos.observaciones,
        parseInt(deTalMedico)
    ];
    consulta = "update medicos set  matricula = ?, nombre = ?, apellido = ?, especialidad = ?, observaciones = ? WHERE matricula = ?";


    conexion.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntro un medico con la matricula el medico ${deTalMedico}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `el medicos ${datosMedico.nombre} se actualizo correctamente`,
                    detail: rows,
                })
            }

        }
    });


}

//--> medicos.metodos.crearMedico(req.body, (err, exito) => {});
metodos.crearMedicos = function (datosMedicos, callback) {
    medicos = [
        datosMedicos.matricula,
        datosMedicos.nombre,
        datosMedicos.apellido,
        datosMedicos.especialidad,
        datosMedicos.observaciones,
    ];
    consulta =
        "INSERT INTO MEDICO (matricula, nombre, apellido, especialidad, observaciones) VALUES (?, ?, ?, ?, ?)";

    conexion.query(consulta, medicos, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un medico con la matricula " + datosMedico.matricula,
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
                message: "el medicos " + datosMedicos.nombre + " " + datosMedicos.apellido + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

// -->  app.delete("/:matricula", eliminarMedico);   -->   medicoBD.metodos.deleteMedico(req.params.matricula, (err, exito) => {}); 
metodos.deleteMedicos = function (matricula, callback) {
    query = "delete from medicos where matricula = ?";
    conexion.query(query, matricula, function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un medico con la matricula " + matricula);
        } else {
            callback(undefined, "el medico " + matricula + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }
