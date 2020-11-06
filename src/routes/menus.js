const { Router } = require('express');
const router = Router();
const Menu = require("../models/Menu");



// Get All Route
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

module.exports = router;