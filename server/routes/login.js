const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('./../models/user');
const app = express();

app.post('/login', function (req, res) {

    let body = req.body;
    console.log(body)

    Usuario.findOne({ email: body.email }, (erro, usuarioDB)=>{
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }

        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        } 

        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        // Genera el token de autenticación
        // let token = jwt.sign({
        //     usuario: usuarioDB,
        // }, process.env.SEED_AUTENTICACION, {
        //     expiresIn: process.env.CADUCIDAD_TOKEN
        // })

        return res.json({
            ok: true,
            user: usuarioDB,
            // token,
        })
    })

});

module.exports = app;

