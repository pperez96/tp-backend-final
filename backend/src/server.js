import express from 'express';
import clienteRoute from './routes/Cliente.route.js';
import restauranteRoute from './routes/Restaurante.route.js';
import mesaRoute from './routes/Mesa.route.js';
import reservaRoute from './routes/Reserva.route.js';
import categoriaRoute from './routes/Categoria.route.js';
import productoRoute from './routes/Producto.route.js';
import consumoRoute from './routes/Consumo.route.js';
import ventaRoute from './routes/Venta.route.js';
import cors from 'cors';
import morgan from 'morgan';
const initApp = express();

//Log HTTP registra todas las peticiones entrantes
initApp.use(morgan('dev'));

//habilitar cors angular
initApp.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }));

//Establecer Formato json
initApp.use(express.json());

//Rutas
initApp.use('/api/cliente', clienteRoute);
initApp.use('/api/restaurante', restauranteRoute);
initApp.use('/api/mesa', mesaRoute);
initApp.use('/api/reserva', reservaRoute);
initApp.use('/api/categoria', categoriaRoute);
initApp.use('/api/producto', productoRoute);
initApp.use('/api/consumo', consumoRoute);
initApp.use('/api/venta', ventaRoute);

export default initApp;

