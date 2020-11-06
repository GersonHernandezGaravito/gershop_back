const { Schema, model } = require('mongoose');
const { Int32 } = require('mongodb');

const esquemaMenu = new Schema({
    _id: String,
    menu: String,
    padre: String,
    link: String,
    permiso: Number
}, {
});

module.exports = model('Menu', esquemaMenu);

//model()
