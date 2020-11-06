const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@gershopdb.ra8xi.mongodb.net/gershop?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology : true
})

.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));