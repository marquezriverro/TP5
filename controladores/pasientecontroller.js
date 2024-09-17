const express = require('express');
const router = express.Router();
const model = require('./../model/pasiente.js');

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para pasiente--- 
// --------------------------------------------------------

router.get("/", listarTodo);
router.get("/:nnssBIGNT", getBynnssBIGNT);
router.post('/create', crear);
router.get('/:nombre', obtenerpasiente);
router.delete("/:nombre", eliminarpasiente);
router.put("/:nombre", modificarpasiente);

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
    model.crear_pasiente(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function buscarPorID(req, res) {
    model.buscarPorID(req.params.pasiente_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}



function actualizar_pasiente(req, res) {
    let pasiente_id = req.params.pasiente_id;
    model.actualizar_pasiente(req.body, pasiente_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function eliminar_pasiente(req, res) {
    let pasiente_id = req.params.vehiculo_id;
    model.eliminar_pasiente(pasiente_id, (err, result) => {
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
module.exports = router;
