import Router from 'express';
import { crearCliente, obtenerClientes, clienteCedula } from '../controllers/ClienteController.js';
const router = Router();

// /api/cliente
router.post('/', crearCliente);
router.get('/', obtenerClientes);
router.get('/:cedula', clienteCedula)


export default router;