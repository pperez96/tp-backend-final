import Router from 'express';
import { crearCategoria, listarCategorias, eliminarCategoria, actualizarCategoria, categoriaId } from '../controllers/CategoriaController.js';
const router = Router();

// /api/categoria
router.post('/', crearCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);
router.get('/', listarCategorias);
router.get('/:id', categoriaId);

export default router;