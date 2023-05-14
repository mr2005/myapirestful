import { Router } from "express";
import {
    getPropiedades,
    getPropiedad,
    deletePropiedad,
    addPropiedad,
    updatePropiedad
} from "../controllers/propiedades.controller.js";



const router = Router();

// LISTAR TODAS LAS PROPIEDADES
router.get("/propiedades", getPropiedades);

// MOSTRAR UNA PROPIEDAD.
router.get("/propiedades/:id", getPropiedad);

// BORRAR UNA PROPIEDAD
router.delete("/propiedades/:id", deletePropiedad);

// AÑADIR UNA PROPIEDAD
router.post("/propiedades", addPropiedad);

// ACTUALIZAR UNA PROPIEDAD
router.put("/propiedades/:id", updatePropiedad);

export default router;