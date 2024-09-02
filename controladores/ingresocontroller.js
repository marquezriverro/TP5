//--- requires ------------------------------------------
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const ingresoBD = require("./../modelos/ingresomodel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para ingreso --- 
// --------------------------------------------------------

app.get("/", listarTodo);
app.get("/:FECHA_INGRESO", getByfecha_ingreso);
app.post('/create', crear);
app.get('/:FECHA_INGRESO', obteneringreso);
app.delete("/:FECHA_INGRESO", eliminaringreso);
app.put("/:FECHA_INGRESO", modificaringreso);









// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function getByFECHA_INGRESO(req, res) {
    especialidad = req.params.FECHA_INGRESO
    ingresoBD = ingresoBD.metodos.getByFECHA_INGRESO(FECHA_INGRESO, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function listarTodo(req, res) {
    ingreso = ingresoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    ingresoBD.metodos.crearingreso(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obteneringreso(req, res) {
    let FECHA_INGRESO = req.params.FECHA_INGRESO;
    ingresoBD.metodos.getingreso(FECHA_INGRESO, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

//app.put("/:FECHA_INGRESO", modificaringreso);



function modificaringreso(req, res) {
    datosingreso = req.body;
    deEsteingreso = req.params.FECHA_INGRESO;
    ingresoBD.metodos.update(datosingreso, deEsteingreso, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //ingreso modificado
        }
    });
}


function eliminarMedico(req, res) {
    medicoBD.metodos.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;