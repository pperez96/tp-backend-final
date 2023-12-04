import Router from 'express';
import {crearProducto, listarProductos, eliminarProducto, actualizarProducto } from '../controllers/ProductoController.js';
const router = Router();

// /api/mesa
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);
router.get('/:idCategoria?', listarProductos);


export default router;