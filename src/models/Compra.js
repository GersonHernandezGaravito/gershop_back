const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaCotizacion = new Schema({
    _id: String,
    nombreCliente: String,
    apellidoCliente: String,
    dpi: String,
    nit: String,
    direccion: String,
    telefono: Number,
    correo: String,
    nombreProducto: String,
    url: String,
    precioUsd: Float32Array,
    precioQtz: Float32Array
}, {
});

module.exports = model('Cotizacion', esquemaCotizacion);

//model()
