//--- requires ------------------------------------------
const express = require('express');
const router = express();
const ingresomodel = require("./../modelos/ingresomodel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para ingreso --- 
// --------------------------------------------------------

router.get("/", listarTodo);
router.get("/:FECHA_INGRESO", getByfecha_ingreso);
router.post('/create', crear);
router.get('/:FECHA_INGRESO', obteneringreso);
router.delete("/:FECHA_INGRESO", eliminaringreso);
router.put("/:FECHA_INGRESO", modificaringreso);
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
    model.crear_ingreso(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function buscarPorID(req, res) {
    model.buscarPorID(req.params.ingreso_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}



function actualizar_ingreso(req, res) {
    let ingreso_id = req.params.ingreso_id;
    model.actualizar_ingreso(req.body, ingreso_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function eliminar_ingreso(req, res) {
    let pasiente_id = req.params.ingreso_id;
    model.eliminar_ingreso(ingreso_id, (err, result) => {
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
