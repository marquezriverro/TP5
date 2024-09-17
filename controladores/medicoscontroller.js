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

function listarTodo(req, res) {
    model.listar_todo = ((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    model.crear_medicos(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function buscarPorID(req, res) {
    model.buscarPorID(req.params.medicos_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}



function actualizar_pasiente(req, res) {
    let medicos_id = req.params.medicos_id;
    model.actualizar_medicos(req.body, medicos_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function eliminar_medicos(req, res) {
    let pasiente_id = req.params.medicos_id;
    model.eliminar_medicos(medicos_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).send(result.message);
            } else {
                res.send(result);
            }
        }
    });
}


//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;
