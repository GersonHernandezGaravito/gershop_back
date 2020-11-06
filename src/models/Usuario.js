const { Schema, model } = require('mongoose');

const esquemaUsuario = new Schema({
    nombreU: String,
    correo: String,
    contrasena: String,
    codigoRol: Number,
    codigoEstilo: Number
}, {
    timestamps : true
});


module.exports = model('Usuario', esquemaUsuario);

//model()
