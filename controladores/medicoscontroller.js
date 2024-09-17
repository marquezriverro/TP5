//--- requires ------------------------------------------

const express = require('express');
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

var model = require('./../model/medicos');

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para MEDICO --- 
// --------------------------------------------------------

app.get("/", listarTodo);
app.get("/:especialidad", getByEspecialidad);
app.post('/create', crear);
app.get('/:matricula', obtenerMedico);
app.delete("/:matricula", eliminarMedico);
app.put("/:matricula", modificarMedico);









// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function getByEspecialidad(req, res) {
    especialidad = req.params.especialidad
    medicos = medicoBD.metodos.getByEspecialidad(especialidad, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function listarTodo(req, res) {
    medicos = medicoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    medicos.metodos.crearMedico(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obtenerMedico(req, res) {
    let matricula = req.params.matricula;
    medicos.metodos.getMedico(matricula, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

//app.put("/:matricula", modificarMedico);



function modificarMedico(req, res) {
    datosMedicos = req.body;
    deEsteMedicos = req.params.matricula;
    medicos.metodos.update(datosMedico, deEsteMedico, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //medico modificado
        }
    });
}


function eliminarMedico(req, res) {
    medicos.metodos.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;
