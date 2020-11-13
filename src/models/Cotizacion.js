const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaCotizacion = new Schema({
    _id: String,
    nombreProducto: String,
    url: String,
    precioUsd: Float32Array,
    precioQtz: Float32Array
}, {
});

module.exports = model('Cotizacion', esquemaCotizacion);

//model()
