import Router from 'express';
import {crearReserva, listarReserva } from '../controllers/ReservaController.js';
const router = Router();

// /api/reserva
router.post('/', crearReserva);
router.get('/:idRestaurante/:fecha/:idCliente?', listarReserva);


export default router;