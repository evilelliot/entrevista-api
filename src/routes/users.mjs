import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
import sanitizer from 'sanitize';
import db from '../../config/db.mjs';
const router = express.Router();
const table = "users_table";

// Endpoints
router.get('/list', async (req, res) => {
    console.log(`Solicitud recibida en ${req.method} ${req.url}`);
    try{
        const all = await prisma.User.findMany();
        if(all.length >= 1){
            res.status(201).json({
                "status": "success",
                "message": "Lista de usuarios",
                "data": {
                    "raw": all
                }
            });
        }else{
            res.status(203).json({
                "message": "No se han encontrado registros",
                "count": all.length,
            });
        }
    }catch(err){
        res.status(500).json({
            "status": "error",
            "message": "Error al devolver los datos de usuarios.",
            "error": err.message 
        });
    }
});
router.get('/list/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const user = await prisma.User.findUnique({
            where: {
                id: id 
            }
        });
        if(user){
            res.status(201).json({
                "status": "success",
                "message": "Información de usuario",
                "data": {
                    "raw": user,
                    "count": user.length
                }
            });
        }else{
            res.status(205).json({
                "error": "Usuario no encontrado.",
                "param": id
            });     
        }
    }catch(err){
        res.status(500).json({
            "status": "error",
            "message": "Error al buscar el usuario.",
            "error": err.message 
        });
    }   
});
router.post('/new', async (req, res) => {
    try {
        const new_user = await prisma.User.create({
            data: {
                nombre: req.body.nombre,
                email: req.body.email,
                edad: req.body.edad,
                sexo: req.body.sexo
            }
        });
        res.status(201).json({
            "status": "success",
            "message": "Nuevo usuario registrado",
            "data": {
                "raw": new_user
            }
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": "Ha ocurrido un error al crear el usuario",
            "error": err.message 
        });
    }
});
router.delete('/delete', async (req, res) => {
    console.log(req.body.id);
    try {
        const delete_one = await prisma.User.delete({
            where: {
                id: req.body.id
            }
        });
        res.status(201).json({
            "status": "success",
            "message": "Usuario eliminado correctamente.",
            "data": {
                "raw": delete_one
            }
        });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": "Ha ocurrido un error al elimin el usuario",
            "error": error.message 
        });
    }
});
router.put('/update', async (req, res) => {
    const data = {
        id: req.body.id,
        nombre: req.body.nombre,
        email: req.body.email,
        edad: req.body.edad,
        sexo: req.body.sexo
    }
    try {
        const update = await prisma.User.update({
            where : {
                id : req.body.id
            },
            data: data  // Pasa el objeto `data` directamente
        });
        res.status(201).json({
            "status": "success",
            "message": "Usuario actualizado correctamente",
            "data": {
                "old_data": data,
                "new_data": update
            }
        });
    } catch (err) {
        res.status(500).json({
            "status": "error",
            "message": "Ha ocurrido un error al crear el usuario",
            "error": err.message 
        });
    }
    
});
export default router;