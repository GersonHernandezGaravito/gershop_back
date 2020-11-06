const express = require ('express');
const app = express();
const cors = require('cors');

require('./database');
//const router = require('./routes');
app.use(cors());
app.use(express.json());

app.use('/api/', require('./routes/index'))

//const rutaUsuarios = require("./routes/usuarios");
//app.use("/api/", rutaUsuarios);

//const rutaMenus = require("./routes/menus");
//app.use("/api/", require("./routes/menus"));


app.listen(3130);

console.log('Servidor en puerto', 3130);