const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaPerfil = new Schema({
    codigoUsuario: String,
    codigoRol: Number
}, {
    timestamps : true
});

module.exports = model('Perfil', esquemaPerfil);

//model()
