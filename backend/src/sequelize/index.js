import Cliente from "./models/Cliente.js";
import Categoria from "./models/Categoria.js";
import Producto from "./models/Producto.js";
import {Venta,DetalleVenta} from "./models/Venta.js"



//Establecemos relacion 1 a N
Categoria.hasMany(Producto, { foreingKey: 'id_categoria', sourceKey: 'id'})

//Varios productos coresponde a una sola categoria N a 1
Producto.belongsTo(Categoria, { foreingKey: 'id_categoria', sourceKey: 'id'});

  Cliente.hasMany(Venta,{ foreignKey: {
    allowNull: false,
    name: 'id_cliente'
  }});

//Varias reservas en diferentes horarios pueden pertenecer a una misma mesa, es decir N a 1
Venta.belongsTo(Cliente, { foreignKey: {
    allowNull: false,
    name: 'id_cliente'
  }});

/* //Un cliente puede hacer varias consumos 1 a N
Cliente.hasMany(Consumo, { foreingKey: {
    allowNull: false,
    name: 'id_cliente',
    field: 'id_cliente'
    },sourceKey:"id"});

// Y varias consumos corresponden a un cliente N a 1
Consumo.belongsTo(Cliente,{ foreingKey: {
    allowNull: false,
    name: 'id_cliente',
    field: 'id_cliente'
    },targetKey:"id"}) */

/* //Un cliente puede hacer varias consumos 1 a N
Cliente.hasMany(Venta, { foreingKey: {
    allowNull: false,
    name: 'id_cliente',
    field: 'id_cliente'
    },sourceKey:"id"});

// Y varias consumos corresponden a un cliente N a 1
Venta.belongsTo(Cliente,{ foreingKey: {
    allowNull: false,
    name: 'id_cliente',
    field: 'id_cliente'
    },targetKey:"id"}) */


//Un producto puede haber en varias detalles 1 a N
Producto.hasMany(DetalleVenta, { foreignKey: {allowNull: false,name:'id_producto'}});

// Y varias detalles corresponden a un producto N a 1
DetalleVenta.belongsTo(Producto, { foreignKey: {allowNull: false,name:'id_producto'}})


export { Cliente };
export {Categoria};
export {Producto};
export {Venta};
export {DetalleVenta};
