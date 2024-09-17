
const express = require('express');
const router = express.Router();
const model = require('./../modelos/pasiente.js');


router.get('/', listar_pasiente);
router.get('/:pasiente_id', buscarPorID);
router.post('/', crear_pasiente);
router.put('/:pasiente_id', actualizar_pasiente);
router.delete('/:pasiente_id', eliminar_pasiente);


function listar_pasiente(req, res) {
    model.listar_pasiente((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function buscarPorID(req, res) {
    model.buscarPorID(req.params.vehiculo_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}


function crear_pasiente(req, res) {
    model.crear_pasiente(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function actualizar_pasiente(req, res) {
    let vehiculo_id = req.params.vehiculo_id;
    model.actualizar_pasiente(req.body, pasiente_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function eliminar_pasiente(req, res) {
    let pasiente_id = req.params.pasiente_id;
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


module.exports = router;
