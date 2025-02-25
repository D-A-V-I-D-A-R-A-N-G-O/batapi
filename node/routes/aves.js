const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const filePath = path.join(__dirname, '../data/aves.json');


// Método para leer los usuarios del archivo aves.json
const getAves = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Método para guardar usuarios en el aves.json
const saveAves = (aves) => {
    fs.writeFileSync(filePath, JSON.stringify(aves, null, 2));
};

 // Ruta para consultar los usuarios
 router.get('/', (req, res) => {
     const aves = getAves();
     res.json(aves);
});

// Obtener usuario por su id
router.get('/:id', (req, res) => {
    const aves = getAves();
    const ave = aves.find(u => u.id === parseInt(req.params.id));
    if (ave) {
        res.json(ave);
    } else {
        res.status(404).json({ message: "Ese usuario no existe parcero, pailas" });
    }
});

// Crear nuevos usuarios
router.post('/', (req, res) => {
    const aves = getAves();
    const newave = {
        id: aves.length ? aves[aves.length - 1].id + 1 : 1,
        nombre: req.body.nombre,
        alimentacion: req.body.alimentacion,
        Viene: req.body.Viene,
        imgUrl: req.body.imgUrl
    };
    aves.push(newave);
    saveAves(aves);
    res.status(201).json(newave);
});

//Actualizando o editando usuarios
router.put('/:id', (req, res)=>{
    const aves = getAves()
    const aveIndex = aves.findIndex(u => u.id === parseInt(req.params.id))

    if (aveIndex !== -1) {
        aves[aveIndex]={
            ...aves[aveIndex],
        nombre: req.body.nombre || aves[aveIndex].nombre,
        alimentacion: req.body.alimentación || aves[aveIndex].alimentacion,
        Viene: req.body.Viene || aves[aveIndex].Viene,
        imgUrl: req.body.imgUrl || aves[aveIndex].imgUrl
        }
        saveAves(aves)
        res.json(aves[aveIndex])
    } else {
        res.status(404).json({message: "Huy, manito esa ave no existe pa"})
    }
})

//Eliminar o borrar un usuario por id
router.delete('/:id', (req, res)=>{
    const aves = getAves()
    const newaves = aves.filter(u => u.id !== parseInt(req.params.id))

    if (newaves.length !== aves.length) {
        saveAves(newaves)
        res.json({message: "ave eliminada satisfactoriamente "})
    } else {
        res.status(404).json({message: "Imposible eliminarla manito esa aves no existe pa"})
    }

})







// Exportamos el módulo
module.exports = router;