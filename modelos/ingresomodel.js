
const express = require('express');
const router = express.Router();
const empleadoModel = require('./../modelos/ingreso.js'); 


// -------------------------------------------------------------- 
// --rutas (endpoint) para manejar las peticiones de empleado --- 
// --------------------------------------------------------------
router.get('/listar', listar);
router.post('/crear', crear);
router.put('/actualizar/:id', actualizar);
router.delete('/eliminar/:id', eliminar);


// -------------------------------------------------------------- 
// -- funciones utilizadas por el router  ----------------------- 
// --------------------------------------------------------------

function listar(req, res) {
    ingresoModel.listar_ingreso((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function crear(req, res) {
    const nuevoingreso = req.body;
    ingresoModel.crear_ingreso(nuevoingreso, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
}

function actualizar(req, res) {
    const ingreso= req.params.id;
    const datosActualizados = req.body;
    ingresoModel.actualizar_ingreso(ingresoId, datosActualizados, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function eliminar(req, res) {
    const ingresoId = req.params.id;
    ingresoModel.eliminar_ingreso(ingresioId, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

module.exports 
