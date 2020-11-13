const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaCotizacion = new Schema({
    nombreProducto: String,
    url: String,
    precioUsd: String,
    precioQtz: String
}, {
});

module.exports = model('Cotizacion', esquemaCotizacion);

//model()
