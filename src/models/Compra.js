const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaCompra = new Schema({
    nombreCliente: String,
    apellidoCliente: String,
    dpi: String,
    nit: String,
    direccion: String,
    telefono: Number,
    correo: String,
    nombreProducto: String,
    url: String,
    precioQtz: String
}, {
});

module.exports = model('Compra', esquemaCompra);

//model()
