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

function getByFECHA_INGRESO(req, res) {
    especialidad = req.params.FECHA_INGRESO
    ingresomodel = ingresoBD.metodos.getByFECHA_INGRESO(FECHA_INGRESO, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function listarTodo(req, res) {
    ingreso = ingresomodel.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    ingresomodel.metodos.crearingreso(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obteneringreso(req, res) {
    let FECHA_INGRESO = req.params.FECHA_INGRESO;
    ingresomodel.metodos.getingreso(FECHA_INGRESO, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

//router.put("/:FECHA_INGRESO", modificaringreso);



function modificaringreso(req, res) {
    datosingreso = req.body;
    deEsteingreso = req.params.FECHA_INGRESO;
    ingresomodel.metodos.update(datosingreso, deEsteingreso, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //ingreso modificado
        }
    });
}


function eliminaringreso(req, res) {
    ingresomodel.metodos.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = router;
