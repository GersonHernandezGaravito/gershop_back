const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const Perfil = require ('../models/Perfil');
const Menu = require ('../models/Menu');
const Estilo = require('../models/Estilo');


const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hola Mundo'));


var BCRYPT_SALT_ROUNDS = 10;
router.post('/registrar', async(req, res) => {
    //req.body.contrasena = bcrypt.hashSync(request.body.contrasena, 10);
    const {nombreU, correo, contrasena, intentos} = req.body;
    const hashedPwd = await bcrypt.hash(req.body.contrasena, BCRYPT_SALT_ROUNDS);
    
    const nuevoUsuario = new Usuario({nombreU, correo, contrasena : hashedPwd, codigoRol: 1, codigoEstilo: 1});
    await nuevoUsuario.save();

    const token = jwt.sign({_id: nuevoUsuario._id}, 'secretkey');
    //const perfil = await Usuario.findOne({_id: nuevoUsuario._id});

    res.status(200).json({token, idU: nuevoUsuario._id,  rol: nuevoUsuario.codigoRol, estilo: nuevoUsuario.codigoEstilo})

});

router.post('/ingresar', async(req, res) => {
    const {nombreU, contrasena} = req.body;
    const usuario = await Usuario.findOne({nombreU}) 
    if (usuario) {
        const cmp = await bcrypt.compare(contrasena, usuario.contrasena);
        if(cmp){
        const token = jwt.sign({_id: usuario._id},'secretkey');
        //const desc = jwt.sign({rol: perfil.codigoRol}, 'secretkey')
        res.status(200).json({token, idU: nuevoUsuario._id, rol: usuario.codigoRol, estilo: usuario.codigoEstilo})

        }
        if(!cmp) {
            return res.status(401).send("Contrasena Incorrecta");
        }
    }
    if (!usuario) return res.status(401).send("Usuario Inexistente");
    //if (usuario.contrasena !== contrasena) 

});

router.get('/menuL', async(req,res) =>{
    //const jsonmenus = new Menu({_id: 5, menu: 'hola', padre: 0, link: 'hola3', permiso: 1});
    //await jsonmenus.save();

    const jsonmenus = await Menu.find()
    return res.json(jsonmenus);
});


router.post('/accesopublico', (req,res) =>{
    res.json([
        {
            _id: 1,
            nombre: "prueba 1",
            descripcion: "prueba numero uno",
            fecha: "2020-08-07"
        },
        {
            _id: 2,
            nombre: "prueba 2",
            descripcion: "prueba numero dos",
            fecha: "2020-08-07"
        }
    ])
});

router.post('/accesoprivado', validarToken, (req,res) =>{
    res.json([
        {
            _id: 1,
            nombre: "prueba 1",
            descripcion: "prueba numero uno",
            fecha: "2020-08-07"
        },
        {
            _id: 2,
            nombre: "prueba 2",
            descripcion: "prueba numero dos",
            fecha: "2020-08-07"
        }
    ])
});

function validarToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Acceso no autorizado');
    }
    const token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        return res.status(401).send('Acceso no autorizado');
    }

    const dato = jwt.verify(token, 'secretkey')
    req.idUsuario = dato._id;
    next();
}

router.get("/estilos", async (req, res) => {
    try {
        const estilos = await Estilo.find()
        res.json(estilos)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}); 

router.get("/menus", async (req, res) => {
    try {
        const menus = await Menu.find()
        res.json(menus)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}); 

// Get One Route
router.get("/menus/:id", getMenu, (req, res) => {
    res.json(res.menu);
  });

// Create One Route 
router.post("/menus", async (req, res) => {
  const {_id, menu, padre, link, permiso} = req.body;
    try {
      const nuevoMenu = new Menu({_id, menu, padre, link, permiso});
      await nuevoMenu.save();
          
      res.status(201).json({ nuevoMenu });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Edit One Route PUT version
router.put("/menus/:id", getMenu, async (req, res) => {
    try {
      const modificarMenu = await res.menu.set(req.body);
      res.json(modificarMenu);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Edit One Route PATCH version
router.patch("/menus/:id", getUser, async (req, res) => {
    if (req.body._id != null) {
      res.menu._id = req.body._id;
    }
    if (req.body.menu != null) {
      res.menu.menu = req.body.menu;
    }
    if (req.body.padre != null) {
        res.menu.padre = req.body.padre;
      }
    if (req.body.link != null) {
        res.menu.link = req.body.link;
    }
    if (req.body.permiso != null) {
        res.menu.permiso = req.body.permiso;
      }
    
    try {
      const updatedMenu = await res.menu.save();
      res.json(updatedMenu);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Delete One Route
//Delete One
router.delete("/menus/:id", getMenu, async (req, res) => {
    try {
      await res.menu.deleteOne();

      res.json({ message: "MENU ELIMINADO" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getMenu(req, res, next) {
    let menu;
    try {
      menu = await Menu.findById(req.params.id);
      if (menu == null) {
        return res.status(404).json({ message: "MENU NO ENCONTRADO" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.menu = menu;
    next();
}

// Get All Route
router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}); 

// Get One Route
router.get("/usuarios/:id", getUser, (req, res) => {
    res.json(res.usuario);
  });

// Create One Route 
router.post("/usuarios", async (req, res) => {
  const {nombreU, correo, contrasena, rol, estilo} = req.body;
  const hashedPwd = await bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS);
    try {
      const nuevoUsuario = new Usuario({nombreU, correo, contrasena : hashedPwd, codigoRol: rol, codigoEstilo: estilo});
      await nuevoUsuario.save();
     
      res.status(201).json({ nuevoUsuario });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Edit One Route PUT version
router.put("/usuarios/:id", getUser, async (req, res) => {
    try {
      const modificarUsuario = await res.usuario.set(req.body);
      res.json(modificarUsuario);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Edit One Route PATCH version
router.patch("/usuarios/:id", getUser, async (req, res) => {
    if (req.body.nombreU != null) {
      res.usuario.nombreU = req.body.nombreU;
    }
    if (req.body.correo != null) {
      res.usuario.correo = req.body.correo;
    }
    if (req.body.codigoRol != null) {
      res.usuario.codigoRol = req.body.codigoRol;
    }
    if (req.body.codigoEstilo != null) {
      res.usuario.codigoEstilo = req.body.codigoEstilo;
    }
    try {
      const updatedUser = await res.usuario.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Delete One Route
//Delete One
router.delete("/usuarios/:id", getUser, async (req, res) => {
    try {
      await res.usuario.deleteOne();
      res.json({ message: "USUARIO ELIMINADO" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let usuario;
    try {
      usuario = await Usuario.findById(req.params.id);
      if (usuario == null) {
        return res.status(404).json({ message: "USUARIO NO ENCONTRADO" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.usuario = usuario;
    next();
}

module.exports = router;