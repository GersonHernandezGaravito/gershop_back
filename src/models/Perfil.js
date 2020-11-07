const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaPerfil = new Schema({
    _id: Number,
    nombreRol: String
}, {
    timestamps : true
});

module.exports = model('Perfil', esquemaPerfil);

//model()
