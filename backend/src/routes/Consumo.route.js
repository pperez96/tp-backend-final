import Router from 'express';
import {obtenerConsumoByMesa, crearConsumo, cerrarConsumo, modificarConsumo,obtenerConsumo, listarConsumo } from '../controllers/ConsumoController.js';
const router = Router();

/**
 * Crear consumo con detalles incluidos. Especificar atributo detalles para los detalles en el req.body
 */
router.post('/', crearConsumo);//se puede crear con detalles incluidos

/**
 * Obtiene consumo con sus detalles de una mesa abierta o devuelve nulo si no hay mesa abierta
 */
router.get('/mesa/:idMesa', obtenerConsumoByMesa);
router.get('/:idConsumo', obtenerConsumo);//Obtener consumo por id
router.get('/', listarConsumo);//Lista de consumos
router.delete('/cerrar/:idConsumo', cerrarConsumo);
router.put('/:idConsumo', modificarConsumo);//sirve para agregar/modificar/eliminar detalles tambien

export default router;