import express from 'express';
import clienteRoute from './routes/Cliente.route.js';
import categoriaRoute from './routes/Categoria.route.js';
import productoRoute from './routes/Producto.route.js';
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
initApp.use('/api/categoria', categoriaRoute);
initApp.use('/api/producto', productoRoute);
initApp.use('/api/venta', ventaRoute);

export default initApp;

