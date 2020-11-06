const express = require ('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3130
require('./database');
//const router = require('./routes');
app.use(cors());
app.use(express.json());

app.use('/api/', require('./routes/index'))

//const rutaUsuarios = require("./routes/usuarios");
//app.use("/api/", rutaUsuarios);

//const rutaMenus = require("./routes/menus");
//app.use("/api/", require("./routes/menus"));


app.listen(port);

console.log('Servidor en puerto', port);