//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.put("/devices/:id",function(req,res){
    console.log(Object.keys(req.body).length)


    let name = req.body.name
    let description = req.body.description
    let state = req.body.state
    let type = req.body.type
    utils.query(
        `UPDATE smart_home.Devices SET name='${name}', description='${description}', state=${state}, type=${type} WHERE id=${req.params.id}` , function (err, rta, field) {
            if (err){
                console.log(err)
                res.send(400)
            }
            else{
                res.send(200)
            }
        }
    );
   
});

//Crear
//TODO AGREGAR VALIDACION
app.post('/devices/', function(req,res){
    console.log(req.body)
    let name = req.body.name
    let description = req.body.description
    let state = req.body.state
    let type = req.body.type
    console.log(name, description, state, type)
    utils.query(
        `INSERT INTO smart_home.Devices (name, description, state, type) VALUES ('${name}', '${description}', ${state}, ${type})`, function (err, rta, field) {
            if (err){
                console.log(err)
            }
        }
    );
    res.send(200)
}
);


//Borrar
 app.delete('/devices/:id', function (req, res) {
    utils.query(`DELETE FROM smart_home.Devices WHERE id=${req.params.id}`, function (err, rta, field) { //delete
        if (err) {
            res.send(err).status(400);
            return;
        }
        let result=rta.affectedRows;
        if(result ==1){
            res.status(200).json({ "id": req.params.id });

        }
        else{
            res.status(404).json({ "ERROR": "No existe dispositivo en la DB" });
 
        }
    });
});

app.get('/devices/', function(req, res) {
   
    console.log("Alguien pidio divices!");

    utils.query(
            `SELECT * from smart_home.Devices`, function (err, rta, field) {
                if (err){
                    console.log(err)
                    res.status(400)
                }
                else {
                    res.send(rta).status(200);
                }
            }
        );
    
    
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
