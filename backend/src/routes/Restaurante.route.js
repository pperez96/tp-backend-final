import Router from 'express';
import { crearRestaurante, listarRestaurantes, eliminarRestaurante, actualizarRestaurante, restauranteId } from '../controllers/RestauranteController.js';
const router = Router();

// /api/restaurante
router.post('/', crearRestaurante);
router.put('/:id', actualizarRestaurante);
router.delete('/:id', eliminarRestaurante);
router.get('/', listarRestaurantes);
router.get('/:id', restauranteId);

export default router;