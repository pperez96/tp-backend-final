import Router from 'express';
import {crearVenta, cerrarVenta, modificarVenta, obtenerVenta, listarVenta } from '../controllers/VentaController.js';
const router = Router();

/**
 * Crear venta con detalles incluidos. Especificar atributo detalles para los detalles en el req.body
 */
router.post('/', crearVenta);//se puede crear con detalles incluidos

/**
 * Obtiene venta con sus detalles de una mesa abierta o devuelve nulo si no hay mesa abierta
 */
router.get('/:idVenta', obtenerVenta);//Obtener venta por id
router.get('/', listarVenta);//Lista de ventas
router.delete('/cerrar/:idVenta', cerrarVenta);
router.put('/:idVenta', modificarVenta);//sirve para agregar/modificar/eliminar detalles tambien

export default router;