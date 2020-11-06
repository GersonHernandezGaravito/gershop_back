const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaEstilo = new Schema({
    _id: String,
    estilo: String,
    path: String,
    link: String,
}, {
    timestamps : true
});

module.exports = model('Estilo', esquemaEstilo);
