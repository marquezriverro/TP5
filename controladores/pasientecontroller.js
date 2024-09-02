const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const medicoBD = require("./../modelos/pasienteModel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para pasiente--- 
// --------------------------------------------------------

app.get("/", listarTodo);
app.get("/:nnssBIGNT", getBynnssBIGNT);
app.post('/create', crear);
app.get('/:nombre', obtenerpasiente);
app.delete("/:nombre", eliminarpasiente);
app.put("/:nombre", modificarpasiente);









// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function getBynnssBIGNT(req, res) {
    nnssBIGNT= req.params.nnssBIGNT
    pasiente = pasienteBD.metodos.getBynnssBIGNT(nnssBIGNT, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function listarTodo(req, res) {
    pasiente = pasienteBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    pasienteBD.metodos.crearpasiente(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obtenerpasiente(req, res) {
    let nnssBIGNT = req.params.nnssBIGNT;
    pasienteBD.metodos.getpasiente(nnssBIGNT, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

//app.put("/:matricula", modificarpasiente);



function modificarpasiente(req, res) {
    datospasiente = req.body;
    deEstepasiente = req.params.nnssBIGNT;
    pasienteBD.metodos.update(datospasiente, deEstepasiente, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //pasiente modificado
        }
    });
}


function eliminarpasiente(req, res) {
    medicoBD.metodos.deletepasiente(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;